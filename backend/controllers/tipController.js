import Tip from "../model/Tip.js";
import Streamer from "../model/Streamer.js"; 

class TipController {

    /**
     * [GET] Lấy 10 tips gần nhất cho một Streamer (Giữ nguyên tên hàm).
     * Route: /api/tips/:username
     */
    async getRecentTips(req, res) { // <-- Tên hàm là getRecentTips
        try {
            const { username } = req.params;
            
            const streamer = await Streamer.findOne({ username });

            if (!streamer) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Streamer không tồn tại.' 
                });
            }

            const recentTips = await Tip.find({ streamerId: streamer._id })
                                        .sort({ timestamp: -1 }) 
                                        .limit(10)
                                        .lean(); 

            res.status(200).json({
                success: true,
                data: recentTips
            });
        } catch (error) {
            console.error("❌ Lỗi khi lấy lịch sử tips:", error);
            res.status(500).json({ 
                success: false,
                message: 'Lỗi server nội bộ',
                error: error.message 
            });
        }
    }

    /**
     * [POST] Ghi nhận một giao dịch tip mới (Giữ nguyên tên hàm).
     * Route: /api/tips
     */
    async recordTip(req, res) { // <-- Tên hàm là recordTip
        const { username, viewerWallet, amount, transactionHash, tokenSymbol, message } = req.body;

        try {
            const streamer = await Streamer.findOne({ username });
            if (!streamer) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Streamer không tồn tại' 
                });
            }
            
            const tipAmount = parseFloat(amount);

            const newTip = new Tip({
                streamerId: streamer._id,
                viewerWallet,
                amount: tipAmount,
                tokenSymbol,
                transactionHash,
                message
            });

            await newTip.save();

            streamer.totalTips = (streamer.totalTips || 0) + tipAmount;
            await streamer.save();

            console.log('✅ Ghi nhận Tip thành công:', newTip);

            res.status(201).json({ 
                success: true,
                message: 'Giao dịch tip được ghi nhận thành công!', 
                data: newTip 
            });

        } catch (error) {
            if (error.code === 11000) { 
                return res.status(409).json({ 
                    success: false,
                    message: 'Giao dịch đã được ghi nhận trước đó.' 
                });
            }
            console.error("❌ Lỗi khi ghi nhận tip:", error);
            res.status(500).json({ 
                success: false,
                message: 'Lỗi server nội bộ',
                error: error.message
            });
        }
    }
}

// Export một thể hiện (instance) của class để sử dụng trực tiếp trong router
export default TipController;