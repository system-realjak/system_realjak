import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameScreen } from './components/GameScreen';
import { Hud } from './components/Hud';
import { ChatBox } from './components/ChatBox';
import { CharacterSelector } from './components/CharacterSelector';
import { WorldChanger } from './components/WorldChanger';
import { MapMaker } from './components/MapMaker';
import { ItemShop } from './components/ItemShop';
import type { CharacterStyle, Coin, ChatMessage, Bot, Position, GameMap, GameMode, MapObject, ShopItem } from './types';
import { AVAILABLE_CHARACTERS, BOT_NAMES, WORLD_WIDTH, WORLD_HEIGHT, HEAL_COST, HEAL_AMOUNT, AVAILABLE_MAPS, AVAILABLE_GAME_MODES, SHOP_ITEMS } from './constants';
import { GoogleGenAI } from '@google/genai';

const VIEWPORT_WIDTH = 1000;
const VIEWPORT_HEIGHT = 600;

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const App: React.FC = () => {
  const [playerCharacter, setPlayerCharacter] = useState<CharacterStyle>(AVAILABLE_CHARACTERS[0]);
  const [playerName, setPlayerName] = useState<string>(AVAILABLE_CHARACTERS[0].name);
  const [unlockedCharacters, setUnlockedCharacters] = useState<Set<string>>(new Set([AVAILABLE_CHARACTERS[0].id]));
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 });
  const [bobux, setBobux] = useState<number>(500);
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [playerMaxHp, setPlayerMaxHp] = useState<number>(100);
  const [isMoving, setIsMoving] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'System', text: 'Welcome to Bobux Hub! Use WASD or Arrow Keys to move.', isUser: false, color: 'text-yellow-400' }
  ]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [bots, setBots] = useState<Bot[]>([]);

  const [isCharacterSelectorOpen, setIsCharacterSelectorOpen] = useState(false);
  const [isWorldChangerOpen, setIsWorldChangerOpen] = useState(false);
  const [isMapMakerOpen, setIsMapMakerOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const [inventory, setInventory] = useState<Set<string>>(new Set());
  const [equippedItemId, setEquippedItemId] = useState<string | null>(null);

  const [currentMap, setCurrentMap] = useState<GameMap>(AVAILABLE_MAPS[0]);
  const [currentMode, setCurrentMode] = useState<GameMode>(AVAILABLE_GAME_MODES[0]);
  const [customMapObjects, setCustomMapObjects] = useState<MapObject[]>([]);
  
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Initialize bots
  useEffect(() => {
    const initialBots: Bot[] = BOT_NAMES.map((name, index) => ({
      id: index,
      name: name,
      character: AVAILABLE_CHARACTERS[(index + 1) % AVAILABLE_CHARACTERS.length] || AVAILABLE_CHARACTERS[1],
      position: { x: Math.random() * WORLD_WIDTH, y: Math.random() * WORLD_HEIGHT },
      target: { x: Math.random() * WORLD_WIDTH, y: Math.random() * WORLD_HEIGHT },
      status: 'wandering',
      idleUntil: 0,
    }));
    setBots(initialBots);
  }, []);

  // Bot movement logic
  useEffect(() => {
    const moveBots = () => {
      setBots(prevBots => prevBots.map(bot => {
        if (bot.status === 'idle' && Date.now() > bot.idleUntil) {
            return { ...bot, status: 'wandering', target: { x: Math.random() * WORLD_WIDTH, y: Math.random() * WORLD_HEIGHT }};
        }
        
        if (bot.status === 'wandering') {
            const dx = bot.target.x - bot.position.x;
            const dy = bot.target.y - bot.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 10) {
              return { ...bot, status: 'idle', idleUntil: Date.now() + (Math.random() * 3000 + 2000) };
            }
            
            const speed = 1;
            const newX = bot.position.x + (dx / dist) * speed;
            const newY = bot.position.y + (dy / dist) * speed;

            return { ...bot, position: { x: newX, y: newY } };
        }
        
        return bot;
      }));
    };
    const interval = setInterval(moveBots, 50);
    return () => clearInterval(interval);
  }, []);

  // Coin spawning logic based on Game Mode
  useEffect(() => {
    const spawnCoin = () => {
      if (coins.length < 25) {
        setCoins(prevCoins => [
          ...prevCoins,
          {
            id: Date.now() + Math.random(),
            position: { x: Math.random() * (WORLD_WIDTH - 40) + 20, y: Math.random() * (WORLD_HEIGHT - 40) + 20 }
          }
        ]);
      }
    };
    const interval = setInterval(spawnCoin, currentMode.coinSpawnRate);
    return () => clearInterval(interval);
  }, [coins.length, currentMode]);

  // Bot AI chatting logic
  useEffect(() => {
    const generateBotMessage = async (botName: string) => {
        try {
            const prompt = `You are a player named "${botName}" in a friendly, Roblox-style online game called Bobux Hub. Generate a short, casual chat message (under 15 words) that you might say to other players. You can talk about collecting 'Bobux' (the game's currency), ask to trade, or just say something friendly. Do not use hashtags or emojis.`;
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });
            return response.text.trim();
        } catch (error) {
            console.error("Error generating bot message:", error);
            return "lol"; // Fallback message
        }
    }

    const botChat = async () => {
      const randomBot = bots[Math.floor(Math.random() * bots.length)];
      if (randomBot) {
        const messageText = await generateBotMessage(randomBot.name);
        setMessages(prev => [...prev, { sender: randomBot.name, text: messageText, isUser: false, color: 'text-gray-300' }]);
      }
    };

    const interval = setInterval(botChat, 12000);
    return () => clearInterval(interval);
  }, [bots]);

  // Keyboard listeners for player movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(isMapMakerOpen || isShopOpen) return;
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isMapMakerOpen, isShopOpen]);

  // Main game loop for player movement and interactions
  useEffect(() => {
    const gameLoop = () => {
      let isMovingNow = false;
      const pressed = keysPressed.current;
      if (pressed['w'] || pressed['arrowup'] || pressed['s'] || pressed['arrowdown'] || pressed['a'] || pressed['arrowleft'] || pressed['d'] || pressed['arrowright']) {
        isMovingNow = true;
      }
      setIsMoving(isMovingNow);

      setPlayerPosition(prevPosition => {
        const speed = 4;
        let { x, y } = prevPosition;

        if (pressed['w'] || pressed['arrowup']) y -= speed;
        if (pressed['s'] || pressed['arrowdown']) y += speed;
        if (pressed['a'] || pressed['arrowleft']) x -= speed;
        if (pressed['d'] || pressed['arrowright']) x += speed;

        const playerWidth = 60; 
        const playerHeight = 128;
        x = Math.max(playerWidth / 2, Math.min(WORLD_WIDTH - playerWidth / 2, x));
        y = Math.max(playerHeight / 2, Math.min(WORLD_HEIGHT - playerHeight / 2, y));

        setCoins(prevCoins => {
          const collectedIds = new Set<number>();
          for (const coin of prevCoins) {
            const dx = x - coin.position.x;
            const dy = y - coin.position.y;
            if (Math.sqrt(dx * dx + dy * dy) < 40) {
              collectedIds.add(coin.id);
            }
          }

          if (collectedIds.size > 0) {
            const bobuxGained = Array.from(collectedIds).reduce((acc) => acc + (Math.floor(Math.random() * 5) + 1), 0);
            setBobux(prev => prev + bobuxGained);
            return prevCoins.filter(c => !collectedIds.has(c.id));
          }
          return prevCoins;
        });

        return { x, y };
      });
      requestAnimationFrame(gameLoop);
    };

    const animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSendMessage = useCallback((text: string) => {
    if (text.trim()) {
      setMessages(prev => [...prev, { sender: playerName, text, isUser: true, color: 'text-white' }]);
    }
  }, [playerName]);

  const handleBuyOrSelectCharacter = useCallback((character: CharacterStyle, newName: string) => {
    const isUnlocked = unlockedCharacters.has(character.id);
    const finalName = newName.trim() || character.name;

    if (isUnlocked) {
      setPlayerCharacter(character);
      setPlayerName(finalName);
      setIsCharacterSelectorOpen(false);
      setMessages(prev => [...prev, { sender: 'System', text: `You are now ${finalName}!`, isUser: false, color: 'text-yellow-400' }]);
    } else {
      if (bobux >= character.cost) {
        setBobux(prev => prev - character.cost);
        setUnlockedCharacters(prev => new Set(prev).add(character.id));
        setPlayerCharacter(character);
        setPlayerName(finalName);
        setIsCharacterSelectorOpen(false);
        setMessages(prev => [...prev, { sender: 'System', text: `Unlocked and equipped ${character.name}!`, isUser: false, color: 'text-green-400' }]);
      } else {
        setMessages(prev => [...prev, { sender: 'System', text: `Not enough Bobux to unlock ${character.name}!`, isUser: false, color: 'text-red-400' }]);
      }
    }
  }, [unlockedCharacters, bobux]);

  const handleHeal = useCallback(() => {
    if (bobux >= HEAL_COST && playerHp < playerMaxHp) {
        setBobux(prev => prev - HEAL_COST);
        setPlayerHp(prev => Math.min(playerMaxHp, prev + HEAL_AMOUNT));
        setMessages(prev => [...prev, { sender: 'System', text: `Healed for ${HEAL_AMOUNT} HP!`, isUser: false, color: 'text-green-400' }]);
    } else if (bobux < HEAL_COST) {
        setMessages(prev => [...prev, { sender: 'System', text: `Not enough Bobux to heal!`, isUser: false, color: 'text-red-400' }]);
    }
  }, [bobux, playerHp, playerMaxHp]);
  
  const handleSaveWorld = (map: GameMap, mode: GameMode) => {
    setCurrentMap(map);
    setCurrentMode(mode);
    setIsWorldChangerOpen(false);
  };

  const handleSaveMap = (objects: MapObject[]) => {
    setCustomMapObjects(objects);
    setIsMapMakerOpen(false);
  };

  const handleBuyItem = useCallback((item: ShopItem) => {
    if (bobux >= item.cost && !inventory.has(item.id)) {
      setBobux(prev => prev - item.cost);
      setInventory(prev => new Set(prev).add(item.id));
      setMessages(prev => [...prev, { sender: 'System', text: `You bought the ${item.name}!`, isUser: false, color: 'text-green-400' }]);
    }
  }, [bobux, inventory]);

  const handleEquipItem = useCallback((itemId: string | null) => {
    if (itemId && !inventory.has(itemId)) return; // Can't equip unowned item
    setEquippedItemId(prev => (prev === itemId ? null : itemId)); // Toggle equip
  }, [inventory]);

  const equippedItem = equippedItemId ? SHOP_ITEMS.find(item => item.id === equippedItemId) : null;

  return (
    <div className="bg-gray-900 w-screen h-screen flex justify-center items-center overflow-hidden select-none perspective">
      <div className="relative shadow-2xl preserve-3d" style={{ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT }}>
        <GameScreen 
          map={currentMap}
          coins={coins} 
          bots={bots}
          customMapObjects={customMapObjects}
          playerCharacter={playerCharacter}
          playerName={playerName}
          playerPosition={playerPosition}
          isPlayerMoving={isMoving}
          equippedItem={equippedItem ?? undefined}
          viewportWidth={VIEWPORT_WIDTH}
          viewportHeight={VIEWPORT_HEIGHT}
          worldWidth={WORLD_WIDTH}
          worldHeight={WORLD_HEIGHT}
        />
        <Hud 
          bobux={bobux} 
          playerName={playerName}
          hp={playerHp}
          maxHp={playerMaxHp}
          gameModeName={currentMode.name}
          onOpenSkins={() => setIsCharacterSelectorOpen(true)}
          onOpenWorldChanger={() => setIsWorldChangerOpen(true)}
          onOpenMapMaker={() => setIsMapMakerOpen(true)}
          onOpenShop={() => setIsShopOpen(true)}
          onHeal={handleHeal}
        />
        <ChatBox messages={messages} onSendMessage={handleSendMessage} />
        {isCharacterSelectorOpen && (
          <CharacterSelector 
            onBuyOrSelect={handleBuyOrSelectCharacter}
            onClose={() => setIsCharacterSelectorOpen(false)}
            currentPlayerName={playerName}
            bobux={bobux}
            unlockedCharacters={unlockedCharacters}
          />
        )}
        {isWorldChangerOpen && (
          <WorldChanger
            onSave={handleSaveWorld}
            onClose={() => setIsWorldChangerOpen(false)}
            currentMap={currentMap}
            currentMode={currentMode}
          />
        )}
        {isMapMakerOpen && (
          <MapMaker 
            onSave={handleSaveMap}
            onClose={() => setIsMapMakerOpen(false)}
            initialObjects={customMapObjects}
          />
        )}
        {isShopOpen && (
          <ItemShop
            bobux={bobux}
            inventory={inventory}
            equippedItemId={equippedItemId}
            onBuy={handleBuyItem}
            onEquip={handleEquipItem}
            onClose={() => setIsShopOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;