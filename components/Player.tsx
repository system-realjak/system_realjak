import React, { useState, useEffect } from 'react';
import type { CharacterStyle, Position, ShopItem, ContextMenuTarget } from '../types';

interface PlayerProps {
  character: CharacterStyle;
  position: Position;
  name: string;
  isMoving?: boolean;
  isAttacking?: boolean;
  isSmall?: boolean;
  equippedItem?: ShopItem;
  lastMessage?: { text: string; id: number; } | null;
  onPlayerClick: (target: ContextMenuTarget, event: React.MouseEvent) => void;
}

const CharacterModel: React.FC<{character: CharacterStyle, isMoving?: boolean, isAttacking?: boolean, isSmall?: boolean, equippedItem?: ShopItem}> = ({ character, isMoving = false, isAttacking = false, isSmall = false, equippedItem }) => {
  const scale = isSmall ? 0.6 : 1;
  const s = (val: number) => val * scale;

  const head = { w: s(52), h: s(52) };
  const torso = { w: s(52), h: s(78) };
  const arm = { w: s(24), h: s(78) };
  const leg = { w: s(24), h: s(78) };
  
  const baseHeight = 1;
  const torsoHeight = baseHeight + leg.h;
  const armHeight = torsoHeight;
  const headHeight = torsoHeight + (torso.h / 2);


  return (
    <div className="relative preserve-3d" style={{ width: s(100), height: s(130), transform: `translateZ(${leg.h}px)` }}>
       {/* Legs */}
       <div 
        className={`${character.legColor} border-2 border-black rounded-sm absolute origin-top-center ${isMoving ? 'animate-walk-leg-l' : ''}`}
        style={{ width: leg.w, height: leg.h, top: head.h / 2 + torso.h - leg.h, left: (s(100) - torso.w) / 2, transform: `translateZ(${baseHeight}px)` }}
      ></div>
      <div 
        className={`${character.legColor} border-2 border-black rounded-sm absolute origin-top-center ${isMoving ? 'animate-walk-leg-r' : ''}`}
        style={{ width: leg.w, height: leg.h, top: head.h / 2 + torso.h - leg.h, left: (s(100) + torso.w) / 2 - leg.w, transform: `translateZ(${baseHeight}px)` }}
      ></div>

      {/* Torso */}
      <div 
        className={`${character.torsoColor} border-2 border-black rounded-sm absolute preserve-3d`}
        style={{ width: torso.w, height: torso.h, top: head.h / 2, left: (s(100) - torso.w) / 2, transform: `translateZ(${torsoHeight}px)` }}
      >
        {equippedItem && (
          <div className={`${equippedItem.visual.style}`} style={{ transform: equippedItem.visual.transform }}></div>
        )}
      </div>

      {/* Head */}
      <div 
        className={`${character.headColor} border-2 border-black rounded-sm absolute`}
        style={{ width: head.w, height: head.h, top: 0, left: (s(100) - head.w) / 2, transform: `translateZ(${headHeight}px)` }}
      ></div>

      {/* Arms */}
      <div 
        className={`${character.torsoColor} border-2 border-black rounded-sm absolute origin-top-center ${isMoving && !isAttacking ? 'animate-walk-arm-l' : ''}`}
        style={{ width: arm.w, height: arm.h, top: head.h / 2, left: (s(100) - torso.w) / 2 - arm.w, transform: `translateZ(${armHeight}px)` }}
      ></div>
      <div 
        className={`${character.torsoColor} border-2 border-black rounded-sm absolute origin-top-center ${isMoving && !isAttacking ? 'animate-walk-arm-r' : ''} ${isAttacking ? 'animate-attack-arm-r' : ''}`}
        style={{ width: arm.w, height: arm.h, top: head.h / 2, left: (s(100) + torso.w) / 2, transform: `translateZ(${armHeight}px)` }}
      ></div>
    </div>
  );
};

export const Player: React.FC<PlayerProps> = ({ character, position, name, isMoving, isAttacking, equippedItem, lastMessage, onPlayerClick }) => {
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  useEffect(() => {
    if (lastMessage?.text) {
      setBubbleText(lastMessage.text);
      const timer = setTimeout(() => {
        setBubbleText(null);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [lastMessage]);
  
  return (
    <div
      className="absolute object-3d cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={(e) => onPlayerClick({type: 'player', data: {id: name, name, character}}, e)}
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
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded"
        style={{ transform: 'translateZ(140px)'}}
        >
        {name}
      </div>
      <div className="pt-8">
        <CharacterModel character={character} isMoving={isMoving} isAttacking={isAttacking} equippedItem={equippedItem} />
      </div>
    </div>
  );
};

// Exporting for use in CharacterSelector
export { CharacterModel };