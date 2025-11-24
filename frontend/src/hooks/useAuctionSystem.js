import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import AuctionSystemABI from "../AuctionSystem.json";

// ⚠️ LƯU Ý: CẬP NHẬT ĐỊA CHỈ NÀY MỖI KHI DEPLOY LẠI TRUFFLE
const CONTRACT_ADDRESS = "0xAd277C8C5c49fA080ec5E6a54bF3130395Cbe971"; 

export const useAuctionSystem = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Kết nối ví MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        
        // Tạo provider và signer để GHI dữ liệu (tạo auction, bid)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const auctionContract = new ethers.Contract(CONTRACT_ADDRESS, AuctionSystemABI.abi, signer);
        
        setContract(auctionContract);
        console.log("Đã kết nối ví & Contract Write Mode!");
      } catch (error) {
        console.error("Lỗi kết nối ví:", error);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask!");
    }
  };

  // 2. Lấy danh sách đấu giá (Dùng Provider thường để đọc nhanh không cần ví)
  // Sử dụng useCallback để tránh tạo lại hàm liên tục gây loop
  const fetchAuctions = useCallback(async () => {
    if (!window.ethereum) return;
    setLoading(true);
    try {
      // Dùng Provider để đọc dữ liệu (không cần signer)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const readContract = new ethers.Contract(CONTRACT_ADDRESS, AuctionSystemABI.abi, provider);

      const count = await readContract.getCount(); // Gọi hàm đếm số lượng
      console.log("Tổng số auctions:", count.toString());

      const items = [];
      for (let i = 1; i <= count; i++) { // Giả sử ID bắt đầu từ 1
        const item = await readContract.auctions(i);
        // Chỉ lấy nếu ID hợp lệ (khác 0)
        if(item.id.toString() !== "0") {
            items.push({
              _id: item.id.toString(),
              title: item.title,
              description: item.description,
              imageUrl: item.imageUrl,
              startPrice: ethers.formatEther(item.startPrice),
              currentBid: ethers.formatEther(item.currentBid), // Convert Wei -> ETH
              highestBidder: item.highestBidder,
              endTime: Number(item.endTime), // Convert BigInt -> Number
              active: item.active,
            });
        }
      }
      setAuctions(items);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Dependency rỗng

  // 3. Đặt giá (Bid)
  const placeBid = async (auctionId, amountETH) => {
    if (!contract) {
        alert("Vui lòng kết nối ví trước!");
        await connectWallet();
        return;
    }
    try {
      const weiAmount = ethers.parseEther(amountETH.toString());
      const tx = await contract.placeBid(auctionId, { value: weiAmount });
      alert("Đang xử lý giao dịch...");
      await tx.wait(); 
      alert("Đấu giá thành công!");
      fetchAuctions(); 
    } catch (error) {
      console.error(error);
      alert("Lỗi: " + (error.reason || error.message));
    }
  };

  // 4. Tạo đấu giá mới (Sửa logic kiểm tra contract)
  const createNewAuction = async (data) => {
      // Kiểm tra xem đã có instance contract (đã kết nối ví) chưa
      let currentContract = contract;
      if (!currentContract) {
           if (window.ethereum) {
                // Thử kết nối lại nhanh nếu chưa có
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                currentContract = new ethers.Contract(CONTRACT_ADDRESS, AuctionSystemABI.abi, signer);
                setContract(currentContract);
           } else {
               alert("Chưa kết nối ví!");
               return false;
           }
      }

      try {
          const duration = 86400; 
          const startPriceWei = ethers.parseEther(data.startPrice.toString());

          console.log("Đang tạo auction với giá:", startPriceWei.toString());

          const tx = await currentContract.createAuction(
              data.title,
              data.description,
              data.imageUrl,
              startPriceWei,
              duration
          );
          
          alert("Đang chờ xác nhận trên Blockchain...");
          await tx.wait();
          alert("Đã tạo thành công!");
          return true;
      } catch (error) {
          console.error("Lỗi tạo:", error);
          alert("Lỗi tạo: " + (error.reason || error.message));
          return false;
      }
  };

  // 5. Lấy chi tiết 1 Auction (Thêm mới hàm này)
  const fetchAuctionDetail = async (id) => {
    if (!window.ethereum) return null;
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const readContract = new ethers.Contract(CONTRACT_ADDRESS, AuctionSystemABI.abi, provider);
        
        const item = await readContract.auctions(id);
        return {
            _id: item.id.toString(),
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            currentBid: ethers.formatEther(item.currentBid),
            highestBidder: item.highestBidder,
            endTime: new Date(Number(item.endTime) * 1000).toISOString(), // Convert sang ISO string cho dễ dùng
            active: item.active
        };
    } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
        return null;
    }
  }

  // Tự động load khi vào trang
  useEffect(() => {
      fetchAuctions();
  }, [fetchAuctions]);

  return {
    walletAddress,
    connectWallet,
    auctions,
    placeBid,
    fetchAuctionDetail, // <--- Đã thêm hàm này
    createNewAuction,
    loading,
    fetchAuctions // <--- QUAN TRỌNG: Phải return hàm này
  };
};