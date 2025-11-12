import React, { useState } from 'react';
import type { MapObject, PaletteItemType } from '../types';
import { PALETTE_ITEMS, MAP_MAKER_GRID_SIZE } from '../constants';

interface MapMakerProps {
  onSave: (objects: MapObject[]) => void;
  onClose: () => void;
  initialObjects: MapObject[];
}

export const MapMaker: React.FC<MapMakerProps> = ({ onSave, onClose, initialObjects }) => {
  const [objects, setObjects] = useState<Map<string, MapObject>>(
    new Map(initialObjects.map(obj => [`${obj.position.gridX}-${obj.position.gridY}`, obj]))
  );
  const [selectedTool, setSelectedTool] = useState<PaletteItemType>('block');

  const handleGridClick = (gridX: number, gridY: number) => {
    const key = `${gridX}-${gridY}`;
    const newObjects = new Map(objects);

    if (selectedTool === 'eraser') {
      newObjects.delete(key);
    } else {
      if(newObjects.has(key)) return; // Don't place on top of existing
      newObjects.set(key, {
        id: `obj-${gridX}-${gridY}`,
        type: selectedTool,
        position: { gridX, gridY },
      });
    }
    setObjects(newObjects);
  };
  
  const handleSave = () => {
    onSave(Array.from(objects.values()));
  };

  const gridWidth = 50; // WORLD_WIDTH / GRID_SIZE
  const gridHeight = 30; // WORLD_HEIGHT / GRID_SIZE

  return (
    <div className="absolute inset-0 bg-gray-900 z-50 flex">
      {/* Palette */}
      <div className="w-48 bg-gray-800 p-4 flex flex-col gap-4 border-r-2 border-gray-700">
        <h2 className="text-white font-bold text-xl font-game">Objects</h2>
        {PALETTE_ITEMS.map(item => (
          <button 
            key={item.type}
            onClick={() => setSelectedTool(item.type)}
            className={`p-2 rounded-lg flex items-center gap-3 transition-colors ${selectedTool === item.type ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <div className={item.style}>
              {item.type === 'eraser' && 'X'}
            </div>
            <span className="text-white font-semibold">{item.label}</span>
          </button>
        ))}
        <div className="mt-auto flex flex-col gap-2">
            <button onClick={handleSave} className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700">Save & Exit</button>
            <button onClick={onClose} className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700">Exit</button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="flex-1 bg-green-900 overflow-auto">
        <div 
            className="relative" 
            style={{ width: 2000, height: 1200, backgroundSize: `${MAP_MAKER_GRID_SIZE}px ${MAP_MAKER_GRID_SIZE}px`, backgroundImage: 'linear-gradient(to right, #2d3748 1px, transparent 1px), linear-gradient(to bottom, #2d3748 1px, transparent 1px)' }}
            onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const gridX = Math.floor(x / MAP_MAKER_GRID_SIZE);
                const gridY = Math.floor(y / MAP_MAKER_GRID_SIZE);
                handleGridClick(gridX, gridY);
            }}
        >
          {/* FIX: Explicitly typing `obj` as `MapObject` fixes a TypeScript inference issue where the type was being inferred as `unknown`. */}
          {Array.from(objects.values()).map((obj: MapObject) => (
            <div 
              key={obj.id}
              className={`absolute w-10 h-10 ${PALETTE_ITEMS.find(p => p.type === obj.type)?.style}`}
              style={{ left: obj.position.gridX * MAP_MAKER_GRID_SIZE, top: obj.position.gridY * MAP_MAKER_GRID_SIZE }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};