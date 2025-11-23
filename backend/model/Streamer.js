import mongoose from 'mongoose';

// Schema cho Streamer
const StreamerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    walletAddress: { type: String, required: true, unique: true, trim: true }, // Địa chỉ ví nhận tip
    platform: { type: String, enum: ['Twitch', 'YouTube', 'Custom'], default: 'Custom' },
    bio: { type: String, default: 'Chào mừng đến với kênh của tôi!' },
    totalTips: { type: Number, default: 0 } // Tổng số tips đã nhận (để dễ truy vấn)
});

export default mongoose.model('Streamer', StreamerSchema);