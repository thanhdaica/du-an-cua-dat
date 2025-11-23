import React, { useState } from 'react';
// CHUYỂN VÀO FILE: src/components/modalSteps/StepThree.jsx
const StepThree = ({ registerStreamer, isLoading, message, walletAddress, backToStep }) => {
    const [form, setForm] = useState({ username: '', bio: '', platform: 'Custom' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');

        if (!walletAddress) {
            setStatus('Vui lòng kết nối ví trước khi đăng ký.');
            return;
        }

        const success = await registerStreamer({ ...form, walletAddress });
        if (success) {
            setStatus('Đăng ký thành công! Hãy chia sẻ Username của bạn để nhận Tips.');
        } else {
            setStatus('Đăng ký thất bại. Vui lòng kiểm tra console.');
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => backToStep(2)} className="text-gray-400 hover:text-cyan-400 transition">
                    &larr; Quay lại
                </button>
                <h3 className="text-2xl font-bold text-white">3. Đăng Ký Streamer</h3>
                <div className="w-8"></div>
            </div>

            <p className="text-gray-400 text-center mb-6">
                Đăng ký tài khoản để bắt đầu nhận Crypto Tips!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Địa chỉ Ví (Tự động)</label>
                    <input
                        type="text"
                        value={walletAddress || 'Chưa kết nối...'}
                        readOnly
                        className="w-full p-3 rounded-lg bg-gray-700 text-gray-400 border border-gray-600/50"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username (Tên kênh)</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500"
                        placeholder="Ví dụ: ninja_vn"
                    />
                </div>
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">Mô tả ngắn về kênh</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-cyan-500"
                        placeholder="Chào mừng đến với kênh của tôi!"
                    ></textarea>
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading || !walletAddress}
                    className="w-full py-3 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Đang đăng ký...' : 'Hoàn tất Đăng ký Streamer'}
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
// KẾT THÚC CHUYỂN VÀO FILE: src/components/modalSteps/StepThree.jsx
export default StepThree;