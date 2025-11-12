import React from 'react';
import type { Coin, Bot, CharacterStyle, Position, GameMap, MapObject, ShopItem, ContextMenuTarget } from '../types';
import { Player } from './Player';
import { BotPlayer } from './BotPlayer';
import { CoinComponent } from './Coin';
import { MapObjectComponent } from './MapObjectComponent';

type LastMessage = { text: string; id: number; } | null;

interface GameScreenProps {
  map: GameMap;
  coins: Coin[];
  bots: Bot[];
  customMapObjects: MapObject[];
  playerCharacter: CharacterStyle;
  playerName: string;
  playerPosition: Position;
  isPlayerMoving: boolean;
  isPlayerAttacking: boolean;
  playerLastMessage: LastMessage;
  equippedItem?: ShopItem;
  onPlayerClick: (target: ContextMenuTarget, event: React.MouseEvent) => void;
  viewportWidth: number;
  viewportHeight: number;
  worldWidth: number;
  worldHeight: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({ 
  map,
  coins, 
  bots, 
  customMapObjects,
  playerCharacter, 
  playerName,
  playerPosition, 
  isPlayerMoving,
  isPlayerAttacking,
  playerLastMessage,
  equippedItem,
  onPlayerClick,
  viewportWidth, 
  viewportHeight,
  worldWidth,
  worldHeight
}) => {
  const cameraX = (viewportWidth / 2) - playerPosition.x;
  const cameraY = (viewportHeight / 2) - playerPosition.y;

  const clampedCameraX = Math.max(viewportWidth - worldWidth, Math.min(0, cameraX));
  const clampedCameraY = Math.max(viewportHeight - worldHeight, Math.min(0, cameraY));

  return (
    <div 
      className={`absolute top-0 left-0 w-full h-full ${map.bgColor} overflow-hidden preserve-3d`}
      style={{
        backgroundImage: `linear-gradient(${map.gridColor} 2px, transparent 2px), linear-gradient(90deg, ${map.gridColor} 2px, transparent 2px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div 
        className="absolute top-0 left-0 transition-transform duration-100 preserve-3d world-rotation"
        style={{
            width: worldWidth,
            height: worldHeight,
            transform: `translate(${clampedCameraX}px, ${clampedCameraY}px)`
        }}
      >
        {customMapObjects.map(obj => (
          <MapObjectComponent key={obj.id} object={obj} />
        ))}
        {bots.map(bot => (
          <BotPlayer key={bot.id} bot={bot} onPlayerClick={onPlayerClick} />
        ))}
        <Player 
          character={playerCharacter} 
          position={playerPosition} 
          name={playerName}
          isMoving={isPlayerMoving}
          isAttacking={isPlayerAttacking}
          lastMessage={playerLastMessage}
          equippedItem={equippedItem}
          onPlayerClick={onPlayerClick}
        />
        {coins.map(coin => (
          <CoinComponent key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};