import React from 'react';
import type { MapObject } from '../types';
import { MAP_MAKER_GRID_SIZE, PALETTE_ITEMS } from '../constants';

interface MapObjectProps {
  object: MapObject;
}

export const MapObjectComponent: React.FC<MapObjectProps> = ({ object }) => {
  const paletteItem = PALETTE_ITEMS.find(p => p.type === object.type);

  if (!paletteItem) return null;

  return (
    <div
      className="absolute object-3d"
      style={{
        left: object.position.gridX * MAP_MAKER_GRID_SIZE,
        top: object.position.gridY * MAP_MAKER_GRID_SIZE,
        transform: `translateZ(${MAP_MAKER_GRID_SIZE / 2}px)`
      }}
    >
      <div className={paletteItem.style}></div>
    </div>
  );
};