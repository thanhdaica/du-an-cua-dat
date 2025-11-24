import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuctionSystem } from '../hooks/useAuctionSystem';

const AuctionDetail = () => {
  const { id } = useParams();
  const { fetchAuctionDetail, placeBid, walletAddress } = useAuctionSystem();
  
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  // 1. Tải dữ liệu sản phẩm
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAuctionDetail(id);
      if (data) setItem(data);
    };
    loadData();
  }, [id]);

  // 2. Hiệu ứng đếm ngược thời gian (Countdown)
  useEffect(() => {
    if (!item) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(item.endTime).getTime() - now;

      if (distance < 0) {
        setTimeLeft("Đã kết thúc");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [item]);

  // 3. Xử lý Đấu giá
  const handleBid = async () => {
    if (!bidAmount) return alert("Vui lòng nhập số tiền!");
    if (!walletAddress) return alert("Vui lòng kết nối ví trước!");
    if (parseFloat(bidAmount) <= item.currentBid) return alert(`Phải nhập cao hơn ${item.currentBid} ETH`);

    await placeBid(item._id, bidAmount);
    
    // Refresh lại dữ liệu sau khi bid
    const updatedData = await fetchAuctionDetail(id);
    setItem(updatedData);
    setBidAmount('');
  };

  if (!item) return (
    <div className="flex items-center justify-center h-[80vh] text-cyan-400 animate-pulse text-xl font-mono">
      Scanning Blockchain Data...
    </div>
  );

  const isEnded = new Date() > new Date(item.endTime);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Nút Quay Lại */}
      <Link to="/auctions" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Quay lại thị trường
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* --- CỘT TRÁI: ẢNH SẢN PHẨM --- */}
        <div className="relative group">
          {/* Hiệu ứng Glow nền sau ảnh */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative h-[500px] w-full bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl">
            <img 
              src={item.imageUrl || "https://via.placeholder.com/600"} 
              alt={item.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            
            {/* Tag trạng thái nổi trên ảnh */}
            <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-white text-xs font-mono">
                    #{item._id.slice(-4).toUpperCase()}
                </span>
                {isEnded && (
                    <span className="bg-red-500/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-bold">
                        CLOSED
                    </span>
                )}
            </div>
          </div>
        </div>

        {/* --- CỘT PHẢI: THÔNG TIN --- */}
        <div className="flex flex-col space-y-8 pt-2">
          
          {/* Header Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              {item.title}
            </h1>
            
            {/* Creator Badge */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50 hover:bg-gray-800 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 shadow-inner"></div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] uppercase tracking-wider">Creator</span>
                        <span className="text-white text-sm font-semibold leading-none">Anonymous</span>
                    </div>
                </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-gray-700 pl-4">
              {item.description}
            </p>
          </div>

          {/* --- KHUNG ĐẤU GIÁ (GLASSMORPHISM) --- */}
          <div className="bg-gray-800/30 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="grid grid-cols-2 gap-8 mb-8">
              
              {/* Giá hiện tại */}
              <div>
                <p className="text-gray-400 text-sm mb-2 font-medium">Giá thầu hiện tại</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    {item.currentBid}
                  </span>
                  <span className="text-xl font-bold text-white">ETH</span>
                </div>
                <p className="text-sm text-gray-500 mt-1 font-mono">
                    ≈ ${(item.currentBid * 3000).toLocaleString()} USD
                </p>
              </div>

              {/* Đồng hồ đếm ngược */}
              <div>
                <p className="text-gray-400 text-sm mb-2 font-medium">Kết thúc trong</p>
                <div className="flex items-center">
                   <span className="text-2xl md:text-3xl font-bold text-white font-mono tracking-wider">
                     {timeLeft || "Calculating..."}
                   </span>
                </div>
              </div>
            </div>

            {/* Form đấu giá */}
            {!isEnded ? (
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="number" 
                    step="0.01"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Nhập số ETH muốn đặt..." 
                    className="w-full bg-gray-900/80 border border-gray-600 text-white pl-5 pr-20 py-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all text-lg placeholder:text-gray-600"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold pointer-events-none">
                    ETH
                  </span>
                </div>

                <button 
                  onClick={handleBid}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  {walletAddress ? "Xác Nhận Đặt Giá" : "Kết Nối Ví Để Đấu Giá"}
                </button>
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-center animate-fade-in">
                <h3 className="text-red-400 font-bold text-xl mb-1">Phiên Đấu Giá Đã Đóng</h3>
                <p className="text-gray-400 text-sm">
                    Người thắng: <span className="text-white font-mono">{item.highestBidder ? item.highestBidder.slice(0,10) + "..." : "Không có"}</span>
                </p>
              </div>
            )}
          </div>

          {/* Lịch sử (Demo UI) */}
          <div className="pt-4">
             <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Hoạt động gần đây
             </h3>
             <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">👤</div>
                        <div>
                            <p className="text-white text-sm font-bold">Bidder ẩn danh</p>
                            <p className="text-gray-500 text-xs">Vừa xong</p>
                        </div>
                    </div>
                    <span className="text-green-400 font-mono font-bold">{item.currentBid} ETH</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;