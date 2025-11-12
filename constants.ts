import type { CharacterStyle, GameMap, GameMode, PaletteItem, ShopItem } from './types';

export const WORLD_WIDTH = 2000;
export const WORLD_HEIGHT = 1200;

export const HEAL_COST = 10;
export const HEAL_AMOUNT = 20;

export const AVAILABLE_CHARACTERS: CharacterStyle[] = [
  { id: 'player1', name: 'CoolBlue', headColor: 'bg-blue-400', torsoColor: 'bg-blue-600', legColor: 'bg-gray-700', cost: 0 },
  { id: 'player2', name: 'RedRebel', headColor: 'bg-red-400', torsoColor: 'bg-red-600', legColor: 'bg-gray-800', cost: 50 },
  { id: 'player3', name: 'GreenGuard', headColor: 'bg-green-400', torsoColor: 'bg-green-600', legColor: 'bg-slate-700', cost: 75 },
  { id: 'player4', name: 'PurplePaladin', headColor: 'bg-purple-400', torsoColor: 'bg-purple-600', legColor: 'bg-gray-600', cost: 100 },
  { id: 'player5', name: 'OrangeOmega', headColor: 'bg-orange-400', torsoColor: 'bg-orange-600', legColor: 'bg-stone-700', cost: 125 },
  { id: 'player6', name: 'YellowYonder', headColor: 'bg-yellow-300', torsoColor: 'bg-yellow-500', legColor: 'bg-zinc-800', cost: 150 },
  { id: 'player7', name: 'PinkPower', headColor: 'bg-pink-400', torsoColor: 'bg-pink-600', legColor: 'bg-gray-500', cost: 200 },
];

export const BOT_NAMES: string[] = ['Blocky', 'Nooblet', 'PixelPal', 'VertexVince', 'CraftyChris'];

export const AVAILABLE_MAPS: GameMap[] = [
    { id: 'grass', name: 'Grassland', bgColor: 'bg-green-800', gridColor: 'rgba(255,255,255,0.05)'},
    { id: 'desert', name: 'Desert', bgColor: 'bg-yellow-800', gridColor: 'rgba(0,0,0,0.05)'},
];

export const AVAILABLE_GAME_MODES: GameMode[] = [
    { id: 'hangout', name: 'Hangout', description: 'Chill and chat with others.', coinSpawnRate: 2000 },
    { id: 'coinrush', name: 'Coin Rush', description: 'Coins spawn much faster!', coinSpawnRate: 500 },
];

export const MAP_MAKER_GRID_SIZE = 40;

export const PALETTE_ITEMS: PaletteItem[] = [
    { type: 'block', label: 'Block', style: 'w-10 h-10 bg-amber-700 border-2 border-black' },
    { type: 'rock', label: 'Rock', style: 'w-10 h-10 bg-gray-500 border-2 border-black rounded-full' },
    { type: 'tree', label: 'Tree', style: 'w-10 h-10 bg-green-600 border-2 border-black rounded-t-full' },
    { type: 'eraser', label: 'Eraser', style: 'w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center text-white font-bold text-xl' },
];

export const SHOP_ITEMS: ShopItem[] = [
    { 
        id: 'sword1', 
        name: 'Pixel Sword', 
        cost: 250, 
        type: 'weapon', 
        style: 'w-5 h-20 bg-gray-400 border-2 border-black -rotate-45',
        visual: {
            style: 'w-6 h-24 bg-gray-400 border-2 border-black absolute',
            transform: 'translateX(35px) translateY(-10px) translateZ(45px) rotateZ(-45deg) rotateX(0deg)'
        }
    },
    { 
        id: 'gun1', 
        name: 'Bolt Blaster', 
        cost: 400, 
        type: 'weapon', 
        style: 'w-16 h-10 bg-red-600 border-2 border-black',
        visual: {
            style: 'w-20 h-12 bg-red-600 border-2 border-black absolute',
            transform: 'translateX(-40px) translateY(0px) translateZ(45px) rotateZ(0deg) rotateY(20deg)'
        }
    },
     { 
        id: 'chair1', 
        name: 'Blocky Chair', 
        cost: 100, 
        type: 'gear', 
        style: 'w-12 h-16 bg-amber-800 border-2 border-black',
        visual: {
             style: 'w-12 h-20 bg-amber-800 border-2 border-black absolute',
            transform: 'translateX(30px) translateY(20px) translateZ(0px) rotateZ(-15deg) rotateX(80deg)'
        }
    },
];