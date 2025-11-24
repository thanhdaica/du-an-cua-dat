import { useState, useEffect } from "react";

export const useAuctionSystem = () => {
  // --- 1. KHAI BÁO STATE ---
  const [walletAddress, setWalletAddress] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 2. GỬI VÍ VỀ BACKEND (Đăng nhập/Đăng ký) ---
  const loginBackend = async (address) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: address }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setCurrentUser(data); // Lưu user (tên, role...) vào state
        console.log("Đăng nhập thành công:", data);
      } else {
        console.error("Lỗi đăng nhập:", data);
      }
    } catch (error) {
      console.error("Lỗi server auth:", error);
    }
  };

  // --- 3. XỬ LÝ KHI TÀI KHOẢN THAY ĐỔI (QUAN TRỌNG) ---
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // Trường hợp người dùng ngắt kết nối hoặc khóa ví
      console.log("Đã ngắt kết nối ví.");
      setWalletAddress("");
      setCurrentUser(null);
    } else if (accounts[0] !== walletAddress) {
      // Trường hợp đổi sang ví khác -> Cập nhật lại ngay
      console.log("Phát hiện đổi ví sang:", accounts[0]);
      setWalletAddress(accounts[0]);
      await loginBackend(accounts[0]); 
    }
  };

  // --- 4. KẾT NỐI VÍ (HÀM GỌI POPUP) ---
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Lệnh này sẽ hiện Popup MetaMask nếu chưa kết nối
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        // Sau khi người dùng bấm Connect trên popup -> Xử lý
        handleAccountsChanged(accounts);

      } catch (error) {
        console.error("Lỗi kết nối hoặc người dùng từ chối:", error);
      }
    } else {
      alert("Bạn chưa cài MetaMask! Hãy cài Extension.");
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  // --- 5. CÁC CHỨC NĂNG ĐẤU GIÁ (Giữ nguyên logic) ---
  const fetchAuctions = async (filterAddress = null) => {
    setLoading(true);
    let url = "http://localhost:3000/api/auctions";
    if (filterAddress) url += `?bidderAddress=${filterAddress}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setAuctions(data);
    } catch (error) {
      console.error("Failed to fetch auctions", error);
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (auctionId, amount) => {
    if (!walletAddress) return alert("Vui lòng kết nối ví trước!");
    try {
      const res = await fetch("http://localhost:3000/api/auctions/bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auctionId,
          bidderAddress: walletAddress,
          amount: parseFloat(amount),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Đấu giá thành công!");
        fetchAuctions(); 
      } else {
        alert(data.message || "Lỗi đấu giá");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  const fetchAuctionDetail = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/auctions/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) { return null; }
  };

  const createNewAuction = async (auctionData) => {
    try {
        const res = await fetch("http://localhost:3000/api/auctions/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(auctionData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Lỗi tạo');
        return data;
    } catch (error) {
        alert(error.message);
        return null;
    }
  };

  // --- 6. TỰ ĐỘNG LẮNG NGHE SỰ KIỆN ---
  useEffect(() => {
    // Kiểm tra kết nối cũ khi F5
    const checkConnection = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    handleAccountsChanged(accounts);
                }
            } catch (err) { console.error(err); }
        }
    };
    checkConnection();
    fetchAuctions();

    // Đăng ký sự kiện: Khi thay đổi ví trên Extension -> Web tự đổi theo
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    // Hủy sự kiện khi thoát
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return {
    walletAddress,
    currentUser,
    connectWallet,
    auctions,
    placeBid,
    loading,
    fetchAuctions,
    fetchAuctionDetail,
    createNewAuction
  };
};