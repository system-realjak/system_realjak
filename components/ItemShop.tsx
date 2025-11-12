import React, { useState } from 'react';
import type { ShopItem } from '../types';
import { SHOP_ITEMS } from '../constants';

interface ItemShopProps {
  bobux: number;
  inventory: Set<string>;
  equippedItemId: string | null;
  onBuy: (item: ShopItem) => void;
  onEquip: (itemId: string) => void;
  onClose: () => void;
}

const CoinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-.567-.267z" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.743.518.75.75 0 00.47 1.372A3.035 3.035 0 0110 6.5v1.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 11.5v2.005a2.5 2.5 0 01-1.567.977.75.75 0 00-.47 1.372A4.535 4.535 0 0010 17.5v.092a1 1 0 102 0v-.092a4.535 4.535 0 001.743-.518.75.75 0 00-.47-1.372A3.035 3.035 0 0110 14.5v-1.005a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 9.5V7.5a2.5 2.5 0 011.567-.977.75.75 0 00.47-1.372A4.535 4.535 0 0010 5z" clipRule="evenodd" />
    </svg>
);

export const ItemShop: React.FC<ItemShopProps> = ({ bobux, inventory, equippedItemId, onBuy, onEquip, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory'>('shop');
  const inventoryItems = SHOP_ITEMS.filter(item => inventory.has(item.id));

  const renderItem = (item: ShopItem, context: 'shop' | 'inventory') => {
    const isOwned = inventory.has(item.id);
    const canAfford = bobux >= item.cost;
    const isEquipped = equippedItemId === item.id;

    return (
      <div key={item.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-between gap-3">
        <div className="h-24 flex items-center justify-center">
            <div className={item.style}></div>
        </div>
        <div className="text-center w-full">
          <span className="text-white font-semibold text-sm">{item.name}</span>
          {context === 'shop' && (
             isOwned ? (
                 <p className="w-full mt-2 text-green-400 font-bold text-sm">Owned</p>
             ) : (
                <button
                    onClick={() => onBuy(item)}
                    disabled={!canAfford}
                    className={`w-full mt-2 font-bold py-1 px-3 rounded transition-colors duration-200 text-sm flex items-center justify-center gap-1 ${
                        canAfford 
                        ? 'bg-blue-600 hover:bg-blue-700 border-2 border-blue-800 text-white' 
                        : 'bg-gray-500 border-2 border-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                >
                    {item.cost} <CoinIcon />
                </button>
             )
          )}
          {context === 'inventory' && (
            <button
                onClick={() => onEquip(item.id)}
                className={`w-full mt-2 font-bold py-1 px-3 rounded transition-colors duration-200 text-sm ${
                    isEquipped 
                    ? 'bg-yellow-600 hover:bg-yellow-700 border-2 border-yellow-800 text-white' 
                    : 'bg-gray-600 hover:bg-gray-500 border-2 border-gray-700 text-white'
                }`}
            >
                {isEquipped ? 'Unequip' : 'Equip'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl border-2 border-gray-700 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white font-game">Item Shop</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>
        
        <div className="flex border-b border-gray-700">
            <button onClick={() => setActiveTab('shop')} className={`py-2 px-4 font-semibold ${activeTab === 'shop' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}>Shop</button>
            <button onClick={() => setActiveTab('inventory')} className={`py-2 px-4 font-semibold ${activeTab === 'inventory' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}>Inventory</button>
        </div>

        {activeTab === 'shop' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SHOP_ITEMS.map(item => renderItem(item, 'shop'))}
            </div>
        )}

        {activeTab === 'inventory' && (
            inventoryItems.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {inventoryItems.map(item => renderItem(item, 'inventory'))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-8">Your inventory is empty. Buy items from the shop!</p>
            )
        )}
      </div>
    </div>
  );
};