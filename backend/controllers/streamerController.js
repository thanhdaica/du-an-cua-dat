import Streamer from "../model/Streamer.js"; 
// Giả định mô hình Streamer được import từ model/Streamer.js

class StreamerController {

    async registerStreamer(req, res) { 
        const { username, walletAddress, platform, bio } = req.body;

        if (!username || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ Tên người dùng và Địa chỉ ví.'
            });
        }

        try {
            // Kiểm tra xem Streamer đã tồn tại chưa (dựa trên username hoặc walletAddress)
            const existingStreamer = await Streamer.findOne({ 
                $or: [{ username }, { walletAddress }] 
            });

            if (existingStreamer) {
                return res.status(409).json({ 
                    success: false,
                    message: 'Streamer với tên người dùng hoặc địa chỉ ví này đã tồn tại.' 
                });
            }

            // Tạo Streamer mới
            const newStreamer = new Streamer({
                username,
                walletAddress,
                platform: platform || 'Custom', // Sử dụng giá trị mặc định nếu không có
                bio,
            });

            await newStreamer.save();

            res.status(201).json({
                success: true,
                message: 'Đăng ký Streamer thành công!',
                data: {
                    username: newStreamer.username,
                    walletAddress: newStreamer.walletAddress,
                }
            });

        } catch (error) {
            console.error("❌ Lỗi khi đăng ký Streamer:", error);
            res.status(500).json({ 
                success: false,
                message: 'Lỗi server nội bộ',
                error: error.message
            });
        }
    }

    /**
     * [GET] Lấy thông tin chi tiết của một Streamer.
     * Tương đương với hàm getStreamerData gốc.
     * Route: /api/streamer/:username
     */
    async getStreamerData(req, res) { // <-- Phương thức giữ nguyên tên getStreamerData
        try {
            const streamer = await Streamer.findOne({ username: req.params.username });
            
            if (!streamer) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Streamer không tồn tại.' 
                });
            }
            
            // Trả về thông tin công khai của streamer
            res.status(200).json({
                success: true,
                data: {
                    username: streamer.username,
                    walletAddress: streamer.walletAddress,
                    platform: streamer.platform, // Giả định trường này có trong Streamer Model
                    bio: streamer.bio, // Giả định trường này có trong Streamer Model
                    totalTips: streamer.totalTips,
                }
            });
        } catch (error) {
            console.error("❌ Lỗi khi lấy thông tin streamer:", error);
            res.status(500).json({ 
                success: false,
                message: 'Lỗi server nội bộ',
                error: error.message
            });
        }
    }
}

// Export một thể hiện (instance) của class để sử dụng trực tiếp trong router
export default StreamerController;