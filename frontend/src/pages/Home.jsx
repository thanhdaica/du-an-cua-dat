// File: frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Hiệu ứng nền nhẹ (tùy chọn) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent -z-10"></div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6 animate-fade-in-up">
        Secure Bid Forge
      </h1>
      
      <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed">
        Nền tảng đấu giá phi tập trung hàng đầu. <br/>
        Minh bạch tuyệt đối. Bảo mật tối đa.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <Link 
          to="/auctions" 
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg shadow-blue-500/30"
        >
          Khám Phá Đấu Giá
        </Link>
        
        <Link 
          to="/create" 
          className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 font-bold py-4 px-10 rounded-full text-lg transition-transform transform hover:scale-105"
        >
          Tạo Tài Sản Mới
        </Link>
      </div>

      {/* Phần thống kê nhỏ bên dưới */}
      <div className="mt-20 grid grid-cols-3 gap-12 text-gray-400">
        <div>
          <div className="text-3xl font-bold text-white">10k+</div>
          <div className="text-sm">Sản phẩm</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white">50k+</div>
          <div className="text-sm">Lượt Bid</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-white">100%</div>
          <div className="text-sm">Bảo mật</div>
        </div>
      </div>
    </div>
  );
};

export default Home;