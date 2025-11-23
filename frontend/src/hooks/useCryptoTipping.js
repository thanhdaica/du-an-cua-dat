import { useState, useEffect, useCallback } from 'react';
// CHUYỂN VÀO FILE: src/hooks/useCryptoTipping.js
// Giả định bạn đã cài đặt 'ethers' và có Smart Contract Address
const MOCK_API_BASE_URL = 'http://localhost:3000/api'; 
const MOCK_SC_ADDRESS = '0xMockContractAddress'; 

/**
 * Custom Hook quản lý logic Web3 và API Backend
 */
const useCryptoTipping = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [stats, setStats] = useState({ streamers: '...', viewers: '...', transactions: '...' });

    // 1. Fetch Stats API
    const fetchStats = useCallback(async () => {
        try {
            const response = await fetch(`${MOCK_API_BASE_URL}/general/stats`);
            if (response.ok) {
                const data = await response.json();
                setStats({
                    streamers: data.streamerCount ? `${(data.streamerCount / 1000).toFixed(1)}K+` : '10K+',
                    viewers: data.viewerCount ? `${(data.viewerCount / 1000).toFixed(1)}K+` : '50K+',
                    transactions: data.transactionCount ? `${(data.transactionCount / 1000000).toFixed(1)}M+` : '1M+',
                });
            } else {
                setStats({ streamers: '10K+', viewers: '50K+', transactions: '1M+' }); // Fallback
            }
        } catch (error) {
            console.error("Lỗi khi fetch stats:", error);
            setStats({ streamers: '10K+', viewers: '50K+', transactions: '1M+' }); // Fallback
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    // 2. Connect Wallet (MetaMask)
    const connectWallet = useCallback(async () => {
        if (typeof window.ethereum === 'undefined') {
            setMessage('Vui lòng cài đặt MetaMask hoặc sử dụng DApp Browser.');
            return;
        }

        setIsLoading(true);
        setMessage('Đang kết nối ví...');
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Sử dụng ethers.js (cần import bên ngoài file này nếu chia nhỏ)
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // Mock ethers functionality for single file runtime
            const provider = { getSigner: () => ({}) }; 
            const signer = {}; 
            
            setProvider(provider);
            setSigner(signer);
            setWalletAddress(accounts[0]);
            setMessage('Kết nối thành công!');
        } catch (error) {
            console.error("Lỗi kết nối ví:", error);
            setMessage('Kết nối thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 3. Register Streamer API
    const registerStreamer = useCallback(async ({ username, walletAddress, platform, bio }) => {
        setIsLoading(true);
        setMessage('Đang xử lý đăng ký...');
        try {
            const response = await fetch(`${MOCK_API_BASE_URL}/streamer/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, walletAddress, platform, bio }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setMessage(`Đăng ký thành công cho streamer ${username}!`);
                return true;
            } else {
                setMessage(result.message || 'Đăng ký thất bại.');
                return false;
            }
        } catch (error) {
            console.error("Lỗi API đăng ký:", error);
            setMessage('Lỗi kết nối server khi đăng ký.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 4. Send Tip (Mô phỏng Web3 Transaction + API Record)
    const sendTip = useCallback(async ({ streamerUsername, amount, message }) => {
        if (!walletAddress || !signer) {
            setMessage('Vui lòng kết nối ví trước.');
            return false;
        }

        setIsLoading(true);
        setMessage(`Đang gửi ${amount} token đến ${streamerUsername}...`);
        
        try {
            // --- BƯỚC 1: Xử lý giao dịch Web3 (MOCK) ---
            // Trong thực tế: Bạn sẽ dùng signer.sendTransaction hoặc contract.transfer() ở đây
            const mockTransactionHash = `0xMockTx${Date.now()}`; 

            // --- BƯỚC 2: Ghi nhận vào Backend ---
            const response = await fetch(`${MOCK_API_BASE_URL}/tip/record`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: streamerUsername,
                    viewerWallet: walletAddress,
                    amount: parseFloat(amount),
                    transactionHash: mockTransactionHash,
                    tokenSymbol: 'TIP',
                    message,
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setMessage(`Gửi tip thành công! TX: ${mockTransactionHash}`);
                return true;
            } else {
                setMessage(result.message || 'Ghi nhận tip thất bại.');
                return false;
            }

        } catch (error) {
            console.error("Lỗi giao dịch tip:", error);
            setMessage('Giao dịch thất bại. Vui lòng kiểm tra console.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [walletAddress, signer]);

    return {
        walletAddress,
        isLoading,
        message,
        stats,
        connectWallet,
        registerStreamer,
        sendTip,
        setMessage, // Cho phép component reset message
    };
};
// KẾT THÚC CHUYỂN VÀO FILE: src/hooks/useCryptoTipping.js
export default useCryptoTipping;