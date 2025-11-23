import React, { useState } from 'react';
// CHUYỂN VÀO FILE: src/components/modalSteps/StepOne.jsx
const StepOne = ({ setStep, closeModal }) => (
    <div className="flex flex-col items-center text-center p-8">
        <h3 className="text-3xl font-bold text-cyan-400 mb-4">Bắt Đầu Với Crypto Tipping</h3>
        <p className="text-gray-300 mb-8">
            Chỉ 3 bước đơn giản để bắt đầu tặng hoặc nhận token
        </p>

        <div className="space-y-6 w-full max-w-sm">
            <div 
                className="p-4 bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-700 transition"
                onClick={() => setStep(2)}
            >
                <h4 className="flex items-center text-xl font-semibold text-white mb-1">
                    <span className="text-cyan-400 mr-3 text-2xl font-bold">1.</span> Kết Nối Ví Crypto
                </h4>
                <p className="text-sm text-gray-400">
                    Kết nối ví MetaMask của bạn. Nếu chưa có, tạo ví miễn phí trong 2 phút.
                </p>
            </div>
            
            <div className="p-4 bg-gray-700/20 rounded-xl">
                <h4 className="flex items-center text-xl font-semibold text-gray-500 mb-1">
                    <span className="text-gray-500 mr-3 text-2xl font-bold">2.</span> Gửi/Nhận Tip
                </h4>
                <p className="text-sm text-gray-600">
                    Sử dụng nền tảng để tặng hoặc nhận token.
                </p>
            </div>

            <div className="p-4 bg-gray-700/20 rounded-xl">
                <h4 className="flex items-center text-xl font-semibold text-gray-500 mb-1">
                    <span className="text-gray-500 mr-3 text-2xl font-bold">3.</span> Tận hưởng
                </h4>
                <p className="text-sm text-gray-600">
                    Giao dịch nhanh chóng và minh bạch trên blockchain.
                </p>
            </div>
        </div>

        <button 
            className="mt-8 text-gray-400 hover:text-white transition"
            onClick={closeModal}
        >
            Đóng
        </button>
    </div>
);
// KẾT THÚC CHUYỂN VÀO FILE: src/components/modalSteps/StepOne.jsx
export default StepOne;