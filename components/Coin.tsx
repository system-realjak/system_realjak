
import React from 'react';
import type { Coin } from '../types';

interface CoinProps {
  coin: Coin;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-900" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-.567-.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.743.518.75.75 0 00.47 1.372A3.035 3.035 0 0110 6.5v1.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 11.5v2.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 17.5v.092a1 1 0 102 0v-.092a4.535 4.535 0 001.743-.518.75.75 0 00-.47-1.372A3.035 3.035 0 0110 14.5v-1.005a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 9.5V7.5a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 5z" clipRule="evenodd" />
    </svg>
);


export const CoinComponent: React.FC<CoinProps> = ({ coin }) => {
  return (
    <div
      className="absolute flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-full border-4 border-yellow-500 shadow-lg animate-bounce object-3d"
      style={{
        left: `${coin.position.x}px`,
        top: `${coin.position.y}px`,
        transform: 'translate(-50%, -50%) translateZ(20px)'
      }}
    >
        <CoinIcon/>
    </div>
  );
};