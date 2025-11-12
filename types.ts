export interface CharacterStyle {
  id: string;
  name: string;
  headColor: string;
  torsoColor: string;
  legColor: string;
  cost: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Coin {
  id: number;
  position: Position;
}

export interface ChatMessage {
  sender: string;
  text: string;
  isUser: boolean;
  color: string;
}

export interface Bot {
  id: number;
  name: string;
  character: CharacterStyle;
  position: Position;
  target: Position;
  status: 'wandering' | 'idle';
  idleUntil: number;
}

export interface GameMap {
    id: string;
    name: string;
    bgColor: string;
    gridColor: string;
}

export interface GameMode {
    id: string;
    name: string;
    description: string;
    coinSpawnRate: number;
}

export interface MapObject {
  id: string;
  type: 'block' | 'rock' | 'tree';
  position: {
    gridX: number;
    gridY: number;
  }
}

export type PaletteItemType = 'block' | 'rock' | 'tree' | 'eraser';

export interface PaletteItem {
  type: PaletteItemType;
  label: string;
  style: string;
}

export interface ShopItem {
  id: string;
  name: string;
  cost: number;
  type: 'weapon' | 'gear';
  style: string;
  visual: {
    style: string;
    transform: string;
  }
}