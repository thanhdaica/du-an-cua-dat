// File: frontend/src/pages/MyAuctions.jsx
import React, { useEffect } from 'react';
import { useAuctionSystem } from '../hooks/useAuctionSystem';
import AuctionCard from '../components/AuctionCard';

const MyAuctions = () => {
  const { auctions, fetchAuctions, placeBid, walletAddress, loading } = useAuctionSystem();

  useEffect(() => {
    if (walletAddress) {
      // Gọi hàm fetch có truyền tham số filterAddress là ví của mình
      fetchAuctions(walletAddress);
    }
  }, [walletAddress]); // Chạy lại khi ví thay đổi

  if (!walletAddress) {
    return <div className="text-center text-white mt-10">Vui lòng kết nối ví để xem danh sách của bạn.</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Sản Phẩm Bạn Đang Thắng Thế</h2>
      
      {loading ? (
        <div className="text-center text-gray-400">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.length > 0 ? (
            auctions.map((item) => (
              <AuctionCard 
                key={item._id} 
                item={item} 
                onBid={placeBid} 
              />
            ))
          ) : (
            <div className="col-span-3 bg-gray-800 border border-dashed border-gray-600 rounded-xl p-10 text-center">
              <p className="text-gray-400 text-xl">Bạn chưa tham gia đấu giá hoặc chưa thắng sản phẩm nào.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAuctions;