import routerAuth from "./auth.js";
import routerAuction from "./auction.js"; // Import file route mới vừa tạo

export default function router(app) {
    // Xóa dòng app.use('/api/tip'...) và app.use('/api/streamer'...) cũ
    // Thêm dòng này:
    app.use('/api/auctions', routerAuction);
    app.use('/api/auth', routerAuth);
}