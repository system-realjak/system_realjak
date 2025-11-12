import React from 'react';
import type { ContextMenuData } from '../types';

interface PlayerContextMenuProps {
  menuData: ContextMenuData;
  onAddFriend: () => void;
  onClose: () => void;
  isFriend: boolean;
  isSelf: boolean;
}

export const PlayerContextMenu: React.FC<PlayerContextMenuProps> = ({ menuData, onAddFriend, onClose, isFriend, isSelf }) => {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      <div 
        style={{ top: menuData.y, left: menuData.x }} 
        className="fixed bg-gray-800 rounded-lg shadow-lg p-2 z-50 border border-gray-600 flex flex-col items-stretch"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white font-bold px-2 pb-1 mb-1 border-b border-gray-600 text-center">{menuData.target.data.name}</p>
        {!isSelf && (
          <button 
            disabled={isFriend} 
            onClick={onAddFriend} 
            className={`w-full text-sm font-semibold py-1 px-3 rounded transition-colors duration-200 ${
              isFriend 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isFriend ? 'Already Friends' : 'Add Friend'}
          </button>
        )}
      </div>
    </>
  );
};
