// frontend/src/hooks/useAuctionSystem.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AuctionSystemABI from "../AuctionSystem.json"; // Import file JSON vừa copy

// Địa chỉ Contract (Lấy từ log khi chạy truffle migrate hoặc xem trên Ganache)
const CONTRACT_ADDRESS = "0x45472117266f2B7878E8DB8E21d0015e359A75cE"; 

export const useAuctionSystem = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Kết nối ví & Khởi tạo Contract
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);

        // Tạo đối tượng tương tác Smart Contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const auctionContract = new ethers.Contract(CONTRACT_ADDRESS, AuctionSystemABI.abi, signer);
        
        setContract(auctionContract);
        console.log("Đã kết nối Contract!");
      } catch (error) {
        console.error("Lỗi kết nối:", error);
      }
    } else {
      alert("Cần cài MetaMask!");
    }
  };

  // 2. Lấy danh sách từ Blockchain (Thay vì API Node.js)
  const fetchAuctions = async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
        // Dùng Provider để đọc dữ liệu (không cần ví connect cũng đọc được)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const readContract = new ethers.Contract(CONTRACT_ADDRESS, AuctionSystemABI.abi, provider);

        const count = await readContract.getCount(); // Gọi hàm getCount trong Solidity
        const items = [];

        // Duyệt qua từng ID để lấy thông tin
        for (let i = 1; i <= count; i++) {
            const item = await readContract.auctions(i);
            items.push({
                _id: Number(item.id),
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl,
                currentBid: ethers.formatEther(item.currentBid), // Đổi từ Wei sang ETH
                highestBidder: item.highestBidder === "0x0000000000000000000000000000000000000000" ? null : item.highestBidder,
                endTime: new Date(Number(item.endTime) * 1000).toISOString(), // Đổi timestamp sang Date
            });
        }
        setAuctions(items);
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
    } finally {
        setLoading(false);
    }
  };

  // 3. Đấu giá (Gửi Transaction lên Ganache)
  const placeBid = async (auctionId, amountETH) => {
    if (!contract) return alert("Chưa kết nối Contract!");
    try {
      const weiAmount = ethers.parseEther(amountETH.toString()); // Đổi ETH sang Wei
      
      // Gọi hàm placeBid trong Solidity
      const tx = await contract.placeBid(auctionId, { value: weiAmount });
      
      alert("Đang xử lý giao dịch...");
      await tx.wait(); // Chờ Ganache xác nhận block
      
      alert("Đấu giá thành công!");
      fetchAuctions(); // Reload lại list
    } catch (error) {
      console.error(error);
      alert("Lỗi: " + (error.reason || error.message));
    }
  };

  // 4. Tạo đấu giá mới (Gửi Transaction)
  const createNewAuction = async (data) => {
      if (!contract) return alert("Chưa kết nối!");
      try {
          const duration = 86400; // Mặc định 1 ngày (tính bằng giây)
          const startPriceWei = ethers.parseEther(data.startPrice.toString());

          const tx = await contract.createAuction(
              data.title,
              data.description,
              data.imageUrl,
              startPriceWei,
              duration
          );
          await tx.wait();
          alert("Đã tạo thành công trên Blockchain!");
          return true;
      } catch (error) {
          console.error(error);
          return false;
      }
  };

  // Tự động load khi vào trang
  useEffect(() => {
      fetchAuctions();
  }, []);

  return {
    walletAddress,
    connectWallet,
    auctions,
    placeBid,
    fetchAuctionDetail: async (id) => { /* Logic lấy chi tiết */ },
    createNewAuction,
    loading,
    fetchAuctions
  };
};