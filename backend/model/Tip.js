import mongoose from 'mongoose';

// Schema cho giao dịch Tip
const TipSchema = new mongoose.Schema({
    streamerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Streamer', required: true },
    viewerWallet: { type: String, required: true, trim: true }, // Địa chỉ ví người xem
    amount: { type: Number, required: true, min: 0 },
    tokenSymbol: { type: String, required: true, default: 'TIP' },
    transactionHash: { type: String, required: true, unique: true }, // Hash giao dịch blockchain
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Tip', TipSchema);