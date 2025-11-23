import React from 'react';

// CHUYỂN VÀO FILE: src/components/MultiStepModal.jsx
const MultiStepModal = ({ isOpen, closeModal, step, setStep, children, backToStep }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center backdrop-blur-sm">
            <div 
                className="bg-gray-900 rounded-2xl shadow-2xl relative w-full m-4 max-w-xl border border-gray-700/50 transform transition-all duration-300 ease-out scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={closeModal} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    aria-label="Đóng"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                {/* Hiển thị nội dung dựa trên step */}
                {children}
            </div>
        </div>
    );
};
// KẾT THÚC CHUYỂN VÀO FILE: src/components/MultiStepModal.jsx
export default MultiStepModal;