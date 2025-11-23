import React from 'react';
// CHUYỂN VÀO FILE: src/components/HowItWorks.jsx
const HowItWorksStep = ({ num, title, description, onClick }) => (
    <div 
        className="flex flex-col items-center text-center p-6 border border-transparent hover:border-blue-500/50 rounded-xl transition cursor-pointer"
        onClick={onClick}
    >
        <div className="relative mb-4">
            <svg className="w-20 h-20 text-blue-700/50" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold text-white opacity-20">
                {num}
            </span>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Icons placeholder */}
                {num === 1 && <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                {num === 2 && <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
                {num === 3 && <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            </div>
        </div>
        <div className="text-xl font-bold text-cyan-400 opacity-80">{num.toString().padStart(2, '0')} {title}</div>
        <p className="text-2xl font-bold text-white mb-2">{title}</p>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

const HowItWorksSection = ({ openModal }) => (
    <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-white text-center mb-4">Cách Thức Hoạt Động</h2>
            <p className="text-xl text-gray-400 text-center mb-16">
                Chỉ với 3 bước đơn giản, bạn có thể ủng hộ streamer yêu thích bằng crypto
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                <HowItWorksStep
                    num={1}
                    title="Kết Nối Ví"
                    description="Người xem kết nối ví crypto của họ (chỉ MetaMask) với nền tảng một cách dễ dàng và bảo mật."
                    onClick={() => openModal()}
                />
                <HowItWorksStep
                    num={2}
                    title="Gửi Token"
                    description="Chọn số lượng token (ví dụ: $TIP) và gửi tip cho streamer yêu thích của bạn trong vài giây thông qua Smart Contract."
                    onClick={() => openModal(4)} // Gợi ý chuyển đến Step Gửi Tip
                />
                <HowItWorksStep
                    num={3}
                    title="Xác Nhận Ngay"
                    description="Giao dịch được xác nhận gần như ngay lập tức trên blockchain, streamer nhận token an toàn và minh bạch."
                    onClick={() => {}}
                />
            </div>
        </div>
    </section>
);
// KẾT THÚC CHUYỂN VÀO FILE: src/components/HowItWorks.jsx
export default HowItWorksSection; // Export component chính
export { HowItWorksStep }; // Export component phụ nếu cần