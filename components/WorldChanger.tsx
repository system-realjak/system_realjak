import React, { useState } from 'react';
import type { GameMap, GameMode } from '../types';
import { AVAILABLE_MAPS, AVAILABLE_GAME_MODES } from '../constants';

interface WorldChangerProps {
  onSave: (map: GameMap, mode: GameMode) => void;
  onClose: () => void;
  currentMap: GameMap;
  currentMode: GameMode;
}

export const WorldChanger: React.FC<WorldChangerProps> = ({ onSave, onClose, currentMap, currentMode }) => {
    const [selectedMap, setSelectedMap] = useState<GameMap>(currentMap);
    const [selectedMode, setSelectedMode] = useState<GameMode>(currentMode);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-lg border-2 border-gray-700 flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-game">Change World</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        <div>
            <h3 className="text-xl font-bold text-white mb-3">Select Map</h3>
            <div className="grid grid-cols-2 gap-4">
                {AVAILABLE_MAPS.map(map => (
                    <button 
                        key={map.id} 
                        onClick={() => setSelectedMap(map)}
                        className={`p-4 rounded-lg border-4 transition-colors ${selectedMap.id === map.id ? 'border-yellow-400 bg-gray-600' : 'border-gray-700 bg-gray-700 hover:border-gray-500'}`}
                    >
                        <div className={`w-full h-16 rounded ${map.bgColor}`}></div>
                        <p className="text-white font-semibold mt-2">{map.name}</p>
                    </button>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold text-white mb-3">Select Game Mode</h3>
            <div className="flex flex-col gap-3">
                 {AVAILABLE_GAME_MODES.map(mode => (
                    <button 
                        key={mode.id} 
                        onClick={() => setSelectedMode(mode)}
                        className={`p-4 rounded-lg border-4 text-left transition-colors ${selectedMode.id === mode.id ? 'border-yellow-400 bg-gray-600' : 'border-gray-700 bg-gray-700 hover:border-gray-500'}`}
                    >
                        <p className="text-white font-bold text-lg">{mode.name}</p>
                        <p className="text-gray-300 text-sm">{mode.description}</p>
                    </button>
                ))}
            </div>
        </div>

        <button 
            onClick={() => onSave(selectedMap, selectedMode)}
            className="w-full mt-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 border-2 border-green-800 text-lg"
          >
            Save & Play
        </button>

      </div>
    </div>
  );
};
