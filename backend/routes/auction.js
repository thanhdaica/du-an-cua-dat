import express from "express";
import { getAuctions, createAuction, placeBid, getAuctionById } from "../controllers/auctionController.js";

const router = express.Router();

router.get("/", getAuctions);
router.get("/:id", getAuctionById);
router.post("/create", createAuction);
router.post("/bid", placeBid);

export default router;