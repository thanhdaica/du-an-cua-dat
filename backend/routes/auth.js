import express from "express";
import { loginWithWallet } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", loginWithWallet);

export default router;