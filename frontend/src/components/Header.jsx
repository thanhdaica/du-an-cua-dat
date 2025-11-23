import React from 'react';
// CHUYỂN VÀO FILE: src/components/Header.jsx
const Header = () => (
    <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
                <span className="text-cyan-400">$</span>CryptoTip
            </div>
            <nav className="hidden md:flex space-x-6 text-gray-300">
                <a href="#" className="hover:text-cyan-400 transition">Trang chủ</a>
                <a href="#" className="hover:text-cyan-400 transition">Về Token</a>
                <a href="#" className="hover:text-cyan-400 transition">Streamer</a>
                <a href="#" className="hover:text-cyan-400 transition">Hỗ trợ</a>
            </nav>
        </div>
    </header>
);
// KẾT THÚC CHUYỂN VÀO FILE: src/components/Header.jsx
export default Header;
