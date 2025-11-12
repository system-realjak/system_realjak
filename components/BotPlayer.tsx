import React, { useState, useEffect } from 'react';
import type { Bot, ContextMenuTarget } from '../types';
import { CharacterModel } from './Player';

interface BotPlayerProps {
  bot: Bot;
  onPlayerClick: (target: ContextMenuTarget, event: React.MouseEvent) => void;
}

export const BotPlayer: React.FC<BotPlayerProps> = ({ bot, onPlayerClick }) => {
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  useEffect(() => {
    if (bot.lastMessage?.text) {
      setBubbleText(bot.lastMessage.text);
      const timer = setTimeout(() => {
        setBubbleText(null);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [bot.lastMessage]);

  if (bot.status === 'dead') {
    return null;
  }

  const hpPercentage = (bot.hp / bot.maxHp) * 100;

  return (
    <div
      className={`absolute transition-all duration-1000 linear object-3d cursor-pointer ${bot.status === 'dying' ? 'animate-death-poof' : ''}`}
      style={{
        left: `${bot.position.x}px`,
        top: `${bot.position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={(e) => onPlayerClick({type: 'bot', data: bot}, e)}
    >
      {bubbleText && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-max max-w-[200px]" style={{ transform: 'translateZ(140px)'}}>
          <div className="bg-white bg-opacity-90 text-black text-sm rounded-lg px-3 py-1 shadow-md break-words relative">
            {bubbleText}
            {/* Triangle */}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2"
              style={{
                  width: 0, height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid rgba(255, 255, 255, 0.9)',
              }}
            />
          </div>
        </div>
      )}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16" style={{ transform: 'translateZ(140px)'}}>
          <div className="w-full bg-gray-700 rounded-full h-2 border-2 border-black">
              <div className="bg-red-600 h-full rounded-full" style={{ width: `${hpPercentage}%` }}></div>
          </div>
      </div>
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