import express from 'express';
import TipController from'../controllers/tipController.js';  

const routerTip = express.Router();
const tipscontroller = new TipController();

// [GET] Lấy 10 tips gần nhất cho một Streamer (được xử lý bởi Controller)
// Ví dụ: /api/tip/recent/ninja_vn
routerTip.get('/recent/:username',(req, res) => tipscontroller.getRecentTips(req, res));


// [POST] Endpoint MÔ PHỎNG việc ghi nhận tip (được xử lý bởi Controller)
// Ví dụ: /api/tip/record
routerTip.post('/record',(req, res) => tipscontroller.recordTip(req, res));

export default routerTip;