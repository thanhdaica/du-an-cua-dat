import express from 'express';
import StreamerController from'../controllers/streamerController.js'; 

const routerStreamer = express.Router();
const streamerscontroller = new StreamerController();
// Import Controller thay vì Model

// --- API Public (Dùng cho Frontend) ---
// [GET] Lấy thông tin chi tiết của một Streamer (được xử lý bởi Controller)
routerStreamer.post('/register', (req, res) => streamerscontroller.registerStreamer(req, res));
routerStreamer.get('/data/:username', (req, res) => streamerscontroller.getStreamerData(req, res));

export default routerStreamer;