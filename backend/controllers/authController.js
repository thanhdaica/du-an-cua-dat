import User from "../model/User.js";

export const loginWithWallet = async (req, res) => {
  const { walletAddress } = req.body; // Nhận địa chỉ ví từ Frontend gửi xuống

  if (!walletAddress) return res.status(400).json({ message: "Thiếu ví" });

  try {
    // Tìm xem ví này đã từng vào web chưa
    let user = await User.findOne({ walletAddress });

    if (!user) {
      // Nếu chưa -> Tạo User mới (Tính năng ẩn danh: Tự đặt tên theo mã ví)
      user = new User({
        walletAddress,
        username: `User ${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`,
      });
      await user.save();
    }

    // Trả về thông tin user cho Frontend hiển thị
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};