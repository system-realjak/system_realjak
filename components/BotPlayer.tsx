
import React from 'react';
import type { Bot } from '../types';
import { CharacterModel } from './Player';

interface BotPlayerProps {
  bot: Bot;
}

export const BotPlayer: React.FC<BotPlayerProps> = ({ bot }) => {
  return (
    <div
      className="absolute transition-all duration-1000 linear object-3d"
      style={{
        left: `${bot.position.x}px`,
        top: `${bot.position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-gray-300 text-xs px-2 py-1 rounded"
        style={{ transform: 'translateZ(140px)'}}
      >
        {bot.name}
      </div>
      <div className="pt-8">
        <CharacterModel character={bot.character} isMoving={bot.status === 'wandering'} />
      </div>
    </div>
  );
};