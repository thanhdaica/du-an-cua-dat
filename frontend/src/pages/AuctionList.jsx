import React, { useEffect } from 'react';
import { useAuctionSystem } from '../hooks/useAuctionSystem';
import AuctionCard from '../components/AuctionCard';
import { useNavigate } from 'react-router-dom';

const AuctionList = () => {
  const { auctions, fetchAuctions, placeBid, loading } = useAuctionSystem();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuctions(); 
  }, []);

  // Hàm xử lý khi click vào thẻ
  const handleCardClick = (e, id) => {
    // Kiểm tra: Nếu người dùng đang bấm vào nút (Button) hoặc ô nhập (Input) thì KHÔNG chuyển trang
    if (e.target.closest('button') || e.target.closest('input')) {
      return;
    }
    // Còn lại thì chuyển sang trang chi tiết
    navigate(`/auctions/${id}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Sàn Đấu Giá Đang Diễn Ra</h2>
      
      {loading ? (
        <div className="text-white text-center py-20 animate-pulse">Đang tải danh sách...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.length > 0 ? (
            auctions.map((item) => (
              <div 
                key={item._id} 
                className="relative group cursor-pointer transform transition-all hover:-translate-y-1"
                onClick={(e) => handleCardClick(e, item._id)}
              >
                {/* Hiệu ứng viền sáng khi hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 transition duration-300 blur"></div>
                
                <div className="relative">
                   <AuctionCard item={item} onBid={placeBid} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-3 text-center py-10 border border-dashed border-gray-700 rounded-xl">
              Chưa có sản phẩm nào trên sàn.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AuctionList;