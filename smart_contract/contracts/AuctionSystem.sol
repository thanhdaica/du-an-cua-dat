// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AuctionSystem {
    
    struct Auction {
        uint id;
        string title;
        string description;
        string imageUrl;
        uint currentBid; // Tính bằng Wei (đơn vị nhỏ nhất của ETH)
        address payable highestBidder;
        uint endTime;
        bool ended;
        address payable creator;
    }

    // Lưu danh sách đấu giá
    mapping(uint => Auction) public auctions;
    uint public auctionCount;

    // Sự kiện để lưu lịch sử (Log History)
    event NewBid(uint auctionId, address bidder, uint amount, uint time);
    event AuctionCreated(uint auctionId, string title, uint startPrice);

    // 1. Tạo sản phẩm đấu giá mới
    function createAuction(
        string memory _title, 
        string memory _description, 
        string memory _imageUrl, 
        uint _startPrice, 
        uint _durationInSeconds
    ) public {
        auctionCount++;
        
        auctions[auctionCount] = Auction(
            auctionCount,
            _title,
            _description,
            _imageUrl,
            _startPrice, // Giá khởi điểm
            payable(address(0)), // Chưa có người thắng
            block.timestamp + _durationInSeconds,
            false,
            payable(msg.sender)
        );

        emit AuctionCreated(auctionCount, _title, _startPrice);
    }

    // 2. Đấu giá (Bid) - Thay thế hàm placeBid bên Node.js
    function placeBid(uint _auctionId) public payable {
        Auction storage item = auctions[_auctionId];

        require(block.timestamp < item.endTime, "Phien dau gia da ket thuc");
        require(msg.value > item.currentBid, "Gia phai cao hon gia hien tai");

        // Trả lại tiền cho người thắng cũ (nếu có)
        if (item.highestBidder != address(0)) {
            item.highestBidder.transfer(item.currentBid);
        }

        // Cập nhật người thắng mới
        item.currentBid = msg.value;
        item.highestBidder = payable(msg.sender);

        // Lưu log lịch sử lên Blockchain
        emit NewBid(_auctionId, msg.sender, msg.value, block.timestamp);
    }

    // 3. Lấy tổng số lượng (Frontend sẽ dùng để loop lấy danh sách)
    function getCount() public view returns (uint) {
        return auctionCount;
    }
}