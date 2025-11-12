import React from 'react';
import type { Friend } from '../types';

interface FriendsListProps {
  friends: Friend[];
  onClose: () => void;
  onJoinFriend: (serverCode: string) => void;
}

export const FriendsList: React.FC<FriendsListProps> = ({ friends, onClose, onJoinFriend }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md border-2 border-gray-700 flex flex-col gap-4 h-2/3" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white font-game">Friends</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 chat-box space-y-3">
            {friends.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                    <p className="text-gray-400 text-center">You have no friends yet. <br/> Click on a player in the world to add them!</p>
                </div>
            ) : (
                friends.map(friend => (
                    <div key={friend.id} className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${friend.isOnline ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                            <span className="text-white font-semibold">{friend.name}</span>
                        </div>
                        <button 
                            onClick={() => onJoinFriend(friend.serverCode)}
                            className="bg-blue-600 text-white font-bold py-1 px-3 rounded hover:bg-blue-700 transition-colors duration-200 border-2 border-blue-800 text-sm"
                        >
                            Join
                        </button>
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  );
};
