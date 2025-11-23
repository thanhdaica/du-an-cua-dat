import React, { useState } from 'react';
// CHUYỂN VÀO FILE: src/components/modalSteps/StepFour.jsx
const StepFour = ({ sendTip, isLoading, message, walletAddress, backToStep }) => {
    const [form, setForm] = useState({ streamerUsername: '', amount: 10, tipMessage: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        if (!walletAddress) {
            setStatus('Vui lòng kết nối ví để gửi tip.');
            return;
        }

        const success = await sendTip({
            streamerUsername: form.streamerUsername,
            amount: form.amount,
            message: form.tipMessage
        });

        if (success) {
            setStatus('Gửi Tip thành công! Cảm ơn bạn đã ủng hộ.');
        } else {
            setStatus('Gửi Tip thất bại. Vui lòng kiểm tra console.');
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => backToStep(2)} className="text-gray-400 hover:text-cyan-400 transition">
                    &larr; Quay lại
                </button>
                <h3 className="text-2xl font-bold text-white">4. Gửi Tip Crypto</h3>
                <div className="w-8"></div>
            </div>

            <p className="text-gray-400 text-center mb-6">
                Gửi tip token ($TIP) cho streamer yêu thích của bạn ngay lập tức.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg border border-gray-600/50">
                    <p className="text-sm text-gray-400">Ví của bạn: <span className="font-mono">{walletAddress || 'Chưa kết nối'}</span></p>
                </div>
                <div>
                    <label htmlFor="streamerUsername" className="block text-sm font-medium text-gray-300 mb-1">Tên Streamer</label>
                    <input
                        id="streamerUsername"
                        name="streamerUsername"
                        type="text"
                        value={form.streamerUsername}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500"
                        placeholder="Nhập username streamer bạn muốn tip"
                    />
                </div>
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">Số lượng $TIP Token</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        min="1"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label htmlFor="tipMessage" className="block text-sm font-medium text-gray-300 mb-1">Lời nhắn (tùy chọn)</label>
                    <textarea
                        id="tipMessage"
                        name="tipMessage"
                        value={form.tipMessage}
                        onChange={handleChange}
                        rows="2"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500"
                        placeholder="Chúc bạn chơi game vui vẻ!"
                    ></textarea>
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading || !walletAddress || form.amount <= 0}
                    className="w-full py-3 rounded-xl font-semibold bg-cyan-600 hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Đang gửi Tip...' : 'Gửi Tip ngay'}
                </button>
            </form>

            {(message || status) && (
                <p className={`text-center mt-4 ${status.includes('thành công') ? 'text-green-400' : 'text-red-400'}`}>
                    {status || message}
                </p>
            )}
        </div>
    );
};
// KẾT THÚC CHUYỂN VÀO FILE: src/components/modalSteps/StepFour.jsx
export default StepFour;