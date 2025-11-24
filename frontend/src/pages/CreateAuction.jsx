// File: frontend/src/pages/CreateAuction.jsx
import React, { useState } from 'react';
import { useAuctionSystem } from '../hooks/useAuctionSystem';
import { useNavigate } from 'react-router-dom';

const CreateAuction = () => {
  const { createNewAuction, walletAddress } = useAuctionSystem();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startPrice: '',
    imageUrl: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletAddress) return alert("Vui lòng kết nối ví!");

    const success = await createNewAuction(formData);
    if (success) {
      alert("Tạo phiên đấu giá thành công!");
      navigate('/auctions'); // Chuyển hướng về trang danh sách
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Tạo Tài Sản Mới</h2>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-6">
        
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-gray-400 mb-2">Tên vật phẩm</label>
          <input 
            type="text" name="title" required
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-gray-400 mb-2">Mô tả chi tiết</label>
          <textarea 
            name="description" rows="3"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Giá và Thời gian (2 cột) */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2">Giá khởi điểm (ETH)</label>
            <input 
              type="number" name="startPrice" step="0.01" required
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Ngày kết thúc</label>
            <input 
              type="datetime-local" name="endTime" required
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* URL Ảnh */}
        <div>
          <label className="block text-gray-400 mb-2">Link ảnh sản phẩm</label>
          <input 
            type="url" name="imageUrl" placeholder="https://example.com/image.png"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-bold py-4 rounded-lg transition-all mt-4">
          Xác Nhận Tạo
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;