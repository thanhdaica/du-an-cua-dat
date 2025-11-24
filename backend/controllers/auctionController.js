import AuctionItem from "../model/AuctionItem.js"; // Lưu ý: phải có đuôi .js khi import file local
import Bid from "../model/Bid.js";

// Lấy danh sách
export const getAuctions = async (req, res) => {
  // Lấy tham số truy vấn từ URL (ví dụ: ?bidderAddress=0x123...)
  const { bidderAddress } = req.query; 
  let filter = {};

  // Nếu có tham số, thêm điều kiện lọc vào MongoDB Query
  if (bidderAddress) {
    filter.highestBidder = bidderAddress; 
  }

  try {
    // Chỉ cần dùng find(filter) để áp dụng điều kiện lọc
    const auctions = await AuctionItem.find(filter).sort({ endTime: 1 });
    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đấu giá", error: err.message });
  }
};

// Tạo sản phẩm mới
export const createAuction = async (req, res) => {
  try {
    const newItem = new AuctionItem({
      ...req.body,
      currentBid: req.body.startPrice,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Đấu giá (Place Bid)
export const placeBid = async (req, res) => {
  const { auctionId, bidderAddress, amount } = req.body;

  try {
    const auction = await AuctionItem.findById(auctionId);
    if (!auction) return res.status(404).json("Không tìm thấy sản phẩm");

    if (new Date() > new Date(auction.endTime)) {
      return res.status(400).json("Phiên đấu giá đã kết thúc");
    }

    if (amount <= auction.currentBid) {
      return res.status(400).json(`Giá phải cao hơn ${auction.currentBid}`);
    }

    const newBid = new Bid({ auctionId, bidderAddress, amount });
    await newBid.save();

    auction.currentBid = amount;
    auction.highestBidder = bidderAddress;
    await auction.save();

    res.status(200).json({ message: "Thành công!", data: auction });
  } catch (err) {
    res.status(500).json(err);
  }
};
// Thêm hàm này vào cuối file controller
export const getAuctionById = async (req, res) => {
  try {
    const auction = await AuctionItem.findById(req.params.id);
    res.status(200).json(auction);
  } catch (err) {
    res.status(500).json(err);
  }
};
