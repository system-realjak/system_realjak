import React, { useState } from 'react';
import type { CharacterStyle } from '../types';
import { AVAILABLE_CHARACTERS } from '../constants';
import { CharacterModel } from './Player';

interface CharacterSelectorProps {
  onBuyOrSelect: (character: CharacterStyle, name: string) => void;
  onClose: () => void;
  currentPlayerName: string;
  bobux: number;
  unlockedCharacters: Set<string>;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-.567-.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.743.518.75.75 0 00.47 1.372A3.035 3.035 0 0110 6.5v1.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 11.5v2.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 17.5v.092a1 1 0 102 0v-.092a4.535 4.535 0 001.743-.518.75.75 0 00-.47-1.372A3.035 3.035 0 0110 14.5v-1.005a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 9.5V7.5a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 5z" clipRule="evenodd" />
    </svg>
);

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onBuyOrSelect, onClose, currentPlayerName, bobux, unlockedCharacters }) => {
  const [nameInput, setNameInput] = useState(currentPlayerName);
  
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl border-2 border-gray-700 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-game">Skins</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        <div>
            <label htmlFor="name-input" className="block text-white text-sm font-bold mb-2">Player Name</label>
            <input
              id="name-input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              maxLength={16}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AVAILABLE_CHARACTERS.map((char) => {
            const isUnlocked = unlockedCharacters.has(char.id);
            const canAfford = bobux >= char.cost;

            return (
                <div key={char.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-between gap-3 transition-transform hover:scale-105">
                <CharacterModel character={char} isSmall={true} />
                <div className="text-center w-full">
                    <span className="text-white font-semibold text-sm">{char.name}</span>
                    {isUnlocked ? (
                         <button 
                            onClick={() => onBuyOrSelect(char, nameInput)}
                            className="w-full mt-2 bg-green-600 text-white font-bold py-1 px-3 rounded hover:bg-green-700 transition-colors duration-200 border-2 border-green-800 text-sm"
                        >
                            Select
                        </button>
                    ) : (
                        <button 
                            onClick={() => onBuyOrSelect(char, nameInput)}
                            disabled={!canAfford}
                            className={`w-full mt-2 font-bold py-1 px-3 rounded transition-colors duration-200 text-sm flex items-center justify-center gap-1 ${
                                canAfford 
                                ? 'bg-blue-600 hover:bg-blue-700 border-2 border-blue-800 text-white' 
                                : 'bg-gray-500 border-2 border-gray-600 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {char.cost} <CoinIcon />
                        </button>
                    )}
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
