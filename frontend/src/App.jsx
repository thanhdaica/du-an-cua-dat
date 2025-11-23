import React, { useState, useEffect, useCallback } from 'react'; 
// ĐÃ SỬA: Import hook từ thư mục ngang hàng (./hooks)
import useCryptoTipping from './hooks/useCryptoTipping'; 

// ĐÃ SỬA: Import components từ thư mục ngang hàng (./components)
import Header from './components/Header';
import HowItWorksSection from './components/HowItWorks'; 
import MultiStepModal from './components/MultiStepModal';

// ĐÃ SỬA: Import trực tiếp các Step (Thay vì dùng index.js)
import StepOne from './components/modalSteps/StepOne'; 
import StepTwo from './components/modalSteps/StepTwo';
import StepThree from './components/modalSteps/StepThree';
import StepFour from './components/modalSteps/StepFour';
//  để export tất cả các steps

// CHUYỂN VÀO FILE: src/pages/App.jsx (hoặc src/App.jsx)
const App = () => {
    // Logic của Custom Hook (CHUYỂN VÀO FILE: src/hooks/useCryptoTipping.js)
    const { 
        walletAddress, 
        isLoading, 
        message, 
        stats, 
        connectWallet, 
        registerStreamer, 
        sendTip, 
        setMessage 
    } = useCryptoTipping();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Intro, 2: Connect Wallet, 3: Register, 4: Send Tip

    const closeModal = () => {
        setIsModalOpen(false);
        setStep(1); // Reset step khi đóng
        setMessage(''); // Clear message
    };
    
    const openModal = (initialStep = 1) => {
        setStep(initialStep);
        setIsModalOpen(true);
    };

    const backToStep = (targetStep) => {
        setStep(targetStep);
        setMessage(''); // Clear message
    };

    // Render nội dung Modal theo Step
    let modalContent;
    switch (step) {
        case 1:
            modalContent = <StepOne setStep={setStep} closeModal={closeModal} />;
            break;
        case 2:
            modalContent = (
                <StepTwo 
                    connectWallet={connectWallet} 
                    isLoading={isLoading} 
                    message={message} 
                    walletAddress={walletAddress} 
                    setStep={setStep}
                    backToStep={backToStep}
                />
            );
            break;
        case 3:
            modalContent = (
                <StepThree 
                    registerStreamer={registerStreamer} 
                    isLoading={isLoading} 
                    message={message} 
                    walletAddress={walletAddress} 
                    backToStep={backToStep}
                />
            );
            break;
        case 4:
            modalContent = (
                <StepFour 
                    sendTip={sendTip} 
                    isLoading={isLoading} 
                    message={message} 
                    walletAddress={walletAddress} 
                    backToStep={backToStep}
                />
            );
            break;
        default:
            modalContent = <StepOne setStep={setStep} closeModal={closeModal} />;
    }


    return (
        <div className="min-h-screen bg-gray-900 text-white font-inter">
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Tùy chỉnh font Inter */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
            `}</style>

            {/* Header (CHUYỂN VÀO FILE: src/components/Header.jsx) */}
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gray-900 pt-32 pb-20 md:pt-48 md:pb-32">
                    {/* Background Gradients (Mô phỏng hiệu ứng ánh sáng) */}
                    <div className="absolute inset-0 z-0 opacity-20">
                        <div className="w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-10 left-0 animate-blob"></div>
                        <div className="w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 absolute top-1/2 right-0 animate-blob animation-delay-2000"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        
                        {/* Left Content */}
                        <div className="text-center md:text-left">
                            <p className="inline-flex items-center text-sm font-medium text-cyan-400 bg-gray-800 rounded-full px-3 py-1 mb-4 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Blockchain technology
                            </p>
                            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                                Hệ Thống Tip Cho <br />
                                <span className="text-cyan-400 block sm:inline">Streamer</span> Bằng Crypto
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 max-w-md md:max-w-none">
                                Kết nối người xem và streamer qua blockchain. Gửi token nhanh chóng, minh bạch và bảo mật ngay lập tức.
                            </p>
                            
                            <div className="flex justify-center md:justify-start space-x-4">
                                <button 
                                    onClick={() => openModal(1)}
                                    className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition shadow-lg shadow-cyan-500/30"
                                >
                                    Bắt Đầu Ngay
                                </button>
                                <a 
                                    href="#" 
                                    className="px-8 py-3 rounded-xl font-bold text-white border-2 border-gray-600 hover:border-cyan-400 transition"
                                >
                                    Tìm Hiểu Thêm
                                </a>
                            </div>
                        </div>

                        {/* Right Image/Illustration */}
                        <div className="hidden md:block">
                            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/50">
                                {/* Placeholder cho hình ảnh lớn */}
                                <img 
                                    src="https://placehold.co/600x400/1e293b/94a3b8?text=Future+of+Tipping" 
                                    alt="Crypto Tipping System" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-4xl font-extrabold text-white">{stats.streamers}</div>
                                <div className="text-gray-400">Streamers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-white">{stats.viewers}</div>
                                <div className="text-gray-400">Người xem</div>
                            </div>
                            <div>
                                <div className="text-4xl font-extrabold text-white">{stats.transactions}</div>
                                <div className="text-gray-400">Giao dịch</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section (CHUYỂN VÀO FILE: src/components/HowItWorks.jsx) */}
                <HowItWorksSection openModal={openModal} />

                {/* Footer Section */}
                <footer className="py-10 bg-gray-950 border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                        © 2025 CryptoTip System. All rights reserved. Blockchain Project.
                    </div>
                </footer>
            </main>

            {/* MultiStep Modal (CHUYỂN VÀO FILE: src/components/MultiStepModal.jsx) */}
            <MultiStepModal 
                isOpen={isModalOpen} 
                closeModal={closeModal} 
                step={step} 
                setStep={setStep}
                backToStep={backToStep}
            >
                {modalContent}
            </MultiStepModal>
        </div>
    );
};

export default App;
// KẾT THÚC CHUYỂN VÀO FILE: src/pages/App.jsx (hoặc src/App.jsx)