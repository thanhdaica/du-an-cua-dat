import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true }, // ID Account là khóa chính
  username: { type: String }, // Tên hiển thị (sẽ tự tạo nếu chưa có)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);