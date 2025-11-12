import React, { useState } from 'react';

interface TitleScreenProps {
  onHostGame: () => void;
  onJoinGame: (code: string) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onHostGame, onJoinGame }) => {
    const [joinCode, setJoinCode] = useState('');

    const handleJoinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onJoinGame(joinCode);
    }

  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col justify-center items-center z-50 world-rotation preserve-3d">
       <div className="text-center" style={{transform: 'translateZ(100px)'}}>
        <h1 className="text-7xl text-yellow-400 font-game mb-8" style={{ textShadow: '4px 4px #000' }}>
          Bobux Hub
        </h1>
        <button
          onClick={onHostGame}
          className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200 border-4 border-green-800 text-2xl font-game focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Start Game
        </button>

        <div className="mt-12 w-96">
            <h2 className="text-xl text-white font-semibold mb-4">Or join a friend's server</h2>
            <form onSubmit={handleJoinSubmit} className="flex flex-col items-center gap-3">
                <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={5}
                    placeholder="ENTER CODE"
                    className="w-full bg-gray-800 text-yellow-400 text-center font-game text-3xl tracking-widest py-3 rounded-lg border-2 border-gray-700 placeholder-gray-600 outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 border-2 border-blue-800 text-lg font-game w-full"
                >
                    Join Server
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};