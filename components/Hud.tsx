import React from 'react';
import { HEAL_COST } from '../constants';

interface HudProps {
  bobux: number;
  playerName: string;
  hp: number;
  maxHp: number;
  gameModeName: string;
  onOpenSkins: () => void;
  onOpenWorldChanger: () => void;
  onOpenMapMaker: () => void;
  onOpenShop: () => void;
  onHeal: () => void;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-.567-.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.743.518.75.75 0 00.47 1.372A3.035 3.035 0 0110 6.5v1.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 11.5v2.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 17.5v.092a1 1 0 102 0v-.092a4.535 4.535 0 001.743-.518.75.75 0 00-.47-1.372A3.035 3.035 0 0110 14.5v-1.005a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 9.5V7.5a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 5z" clipRule="evenodd" />
    </svg>
);

const GameModeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM10 11a6 6 0 016 6H4a6 6 0 016-6z" />
    </svg>
);

const ShopIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-white"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


export const Hud: React.FC<HudProps> = ({ bobux, playerName, hp, maxHp, gameModeName, onOpenSkins, onOpenWorldChanger, onOpenMapMaker, onOpenShop, onHeal }) => {
    const hpPercentage = (hp / maxHp) * 100;

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end gap-3 w-64">
        <div className="bg-black bg-opacity-60 p-3 rounded-lg shadow-lg flex flex-col items-stretch gap-3 w-full backdrop-blur-sm">
            <div className="flex justify-between items-center">
                <span className="text-white text-md font-bold truncate pr-2">{playerName}</span>
                <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold font-game text-lg">{bobux}</span>
                    <CoinIcon />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center text-xs text-white mb-1">
                    <span>HP</span>
                    <span>{hp} / {maxHp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 border-2 border-black relative overflow-hidden">
                    <div className="bg-red-600 h-full rounded-full transition-all duration-300" style={{ width: `${hpPercentage}%` }}></div>
                </div>
            </div>
            
            <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-2">
                    <GameModeIcon />
                    <span className="text-gray-300 text-xs font-semibold">{gameModeName}</span>
                </div>
                {hp < maxHp && bobux >= HEAL_COST && (
                     <button 
                        onClick={onHeal}
                        className="bg-green-600 text-white font-bold py-1 px-3 rounded-md shadow-sm hover:bg-green-700 transition-colors duration-200 border-2 border-green-800 text-xs"
                    >
                        Heal ({HEAL_COST})
                    </button>
                )}
            </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
            <button 
                onClick={onOpenSkins}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 border-2 border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            >
                Skins
            </button>
             <button 
                onClick={onOpenWorldChanger}
                className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 border-2 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
            >
                World
            </button>
            <button 
                onClick={onOpenShop}
                className="bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-700 transition-colors duration-200 border-2 border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full flex items-center justify-center gap-2"
            >
                <ShopIcon className="h-5 w-5"/> Shop
            </button>
            <button 
                onClick={onOpenMapMaker}
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200 border-2 border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full"
            >
                Map Maker
            </button>
        </div>
    </div>
  );
};