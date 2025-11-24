// File: frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuctionSystem } from "./hooks/useAuctionSystem";

// Import các trang
import Home from './pages/Home';
import AuctionList from './pages/AuctionList';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import MyAuctions from './pages/MyAuctions';

function App() {
  // Lấy thêm biến currentUser từ hook để hiển thị tên
  const { walletAddress, connectWallet, currentUser } = useAuctionSystem();

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-blue-500 selection:text-white">
        
        {/* --- HEADER --- */}
        <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform"></div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                SBF Auction
              </span>
            </Link>

            {/* Menu điều hướng */}
            <nav className="hidden md:flex space-x-8 bg-gray-800/50 px-6 py-2 rounded-full border border-gray-700">
              <Link to="/auctions" className="text-gray-300 hover:text-white font-medium transition-colors hover:scale-105 transform">Sàn Đấu Giá</Link>
              <Link to="/create" className="text-gray-300 hover:text-white font-medium transition-colors hover:scale-105 transform">Tạo Mới</Link>
              <Link to="/my-bids" className="text-gray-300 hover:text-white font-medium transition-colors hover:scale-105 transform">Của Tôi</Link>
            </nav>

            {/* Nút User / Connect Wallet - ĐÃ THIẾT KẾ LẠI */}
            <button
              onClick={connectWallet}
              className={`relative group px-1 py-1 rounded-full transition-all duration-300 ${
                walletAddress 
                  ? "bg-gray-800 border border-gray-700 hover:border-gray-500" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/40"
              }`}
            >
              {walletAddress ? (
                // TRẠNG THÁI: ĐÃ KẾT NỐI
                  <div className="flex items-center gap-3 px-2 pr-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 border-2 border-gray-800 shadow-sm"></div>
                  
                  <div className="flex flex-col items-start">
                    {/* Sửa dòng này: Hiển thị "User" + 4 số cuối ví thay vì username */}
                    <span className="text-sm font-bold text-white leading-none mb-1">
                      User {walletAddress.slice(-4)} 
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-900 px-1.5 rounded tracking-wide">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                </div>
              ) : (
                // TRẠNG THÁI: CHƯA KẾT NỐI
                <div className="px-6 py-2 rounded-full">
                  <span className="font-bold text-white">Kết Nối Ví</span>
                </div>
              )}
            </button>

          </div>
        </header>

        {/* --- NỘI DUNG CHÍNH --- */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auctions" element={<AuctionList />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/my-bids" element={<MyAuctions />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;