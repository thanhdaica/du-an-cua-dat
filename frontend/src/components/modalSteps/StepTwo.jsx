import React, { useState } from 'react'; 
// CHUYỂN VÀO FILE: src/components/modalSteps/StepTwo.jsx
const StepTwo = ({ connectWallet, isLoading, message, walletAddress, setStep, backToStep }) => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <button onClick={() => backToStep(1)} className="text-gray-400 hover:text-cyan-400 transition">
                &larr; Quay lại
            </button>
            <h3 className="text-2xl font-bold text-white">Kết Nối Ví Crypto</h3>
            <div className="w-8"></div>
        </div>
        
        <p className="text-gray-400 text-center mb-8">
            Chọn phương thức kết nối phù hợp với bạn
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            {/* MetaMask Card */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-cyan-500/50">
                <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <h4 className="text-xl font-bold text-white">MetaMask</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">Ví crypto phổ biến nhất cho trình duyệt web</p>
                <ul className="text-sm text-gray-300 space-y-1 mb-6">
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Dễ sử dụng, thân thiện người dùng
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Hỗ trợ nhiều mạng blockchain
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Extension cho Chrome, Firefox, Brave
                    </li>
                </ul>
                <button 
                    onClick={connectWallet}
                    disabled={isLoading || walletAddress}
                    className="w-full py-3 rounded-xl font-semibold bg-cyan-500 hover:bg-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Đang kết nối...' : walletAddress ? 'Đã Kết Nối' : 'Kết nối MetaMask'}
                </button>
                <a 
                    href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer"
                    className="block text-center mt-3 text-sm text-gray-300 hover:text-cyan-400 transition"
                >
                    Tải MetaMask &rarr;
                </a>
            </div>

            {/* DApp Browser Card (instead of WalletConnect) */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-gray-600/50">
                <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" /></svg>
                    <h4 className="text-xl font-bold text-white">Ví DApp/Trình duyệt</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">Kết nối ví di động thông qua trình duyệt DApp</p>
                <ul className="text-sm text-gray-300 space-y-1 mb-6">
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Bảo mật cao với mã hóa end-to-end
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Tương thích với Trust Wallet, Brave Wallet...
                    </li>
                    <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        Được thiết kế cho di động
                    </li>
                </ul>
                <button 
                    disabled={true} // Vô hiệu hóa vì MetaMask là ưu tiên chính
                    className="w-full py-3 rounded-xl font-semibold bg-gray-600/50 text-gray-400"
                >
                    Kết nối DApp Browser
                </button>
                <a 
                    href="#" 
                    className="block text-center mt-3 text-sm text-gray-500"
                >
                    Tìm hiểu thêm
                </a>
            </div>
        </div>

        {message && (
            <p className={`text-center mt-4 ${walletAddress ? 'text-green-400' : 'text-red-400'}`}>
                {message}
            </p>
        )}
        
        {walletAddress && (
            <div className="mt-8 text-center">
                <p className="text-green-400 mb-4">
                    Ví đã kết nối: <span className="font-mono text-sm block md:inline">{walletAddress}</span>
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setStep(4)} // Chuyển đến Step Gửi Tip
                        className="py-2 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition"
                    >
                        Tiếp tục Gửi Tip
                    </button>
                    <button
                        onClick={() => setStep(3)} // Chuyển đến Step Đăng ký
                        className="py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
                    >
                        Đăng ký làm Streamer
                    </button>
                </div>
            </div>
        )}
    </div>
);
// KẾT THÚC CHUYỂN VÀO FILE: src/components/modalSteps/StepTwo.jsx
export default StepTwo;