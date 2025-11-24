import React, { useState } from 'react';

const AuctionCard = ({ item, onBid }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBid = () => {
    if (!bidAmount) return;
    onBid(item._id, bidAmount);
    setBidAmount('');
  };

  const isEnded = new Date() > new Date(item.endTime);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition-all">
      {/* Ảnh mô phỏng */}
      <div className="h-40 bg-gray-700 rounded-lg mb-4 flex items-center justify-center text-gray-500">
        {item.imageUrl ? <img src={item.imageUrl} className="h-full w-full object-cover rounded-lg"/> : "No Image"}
      </div>
      
      <h3 className="text-xl font-bold text-white">{item.title}</h3>
      <p className="text-gray-400 text-sm mb-3">{item.description}</p>
      
      <div className="flex justify-between bg-gray-900 p-3 rounded mb-4">
        <div>
          <span className="text-xs text-gray-500 block">Hiện tại</span>
          <span className="font-bold text-green-400">{item.currentBid} ETH</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 block">Kết thúc</span>
          <span className="text-white text-sm">{new Date(item.endTime).toLocaleDateString()}</span>
        </div>
      </div>

      {!isEnded ? (
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="ETH..."
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleBid}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold transition-colors"
          >
            Bid
          </button>
        </div>
      ) : (
        <div className="bg-red-900/30 text-red-400 text-center py-2 rounded border border-red-900">
          Đã kết thúc
        </div>
      )}
    </div>
  );
};

export default AuctionCard;