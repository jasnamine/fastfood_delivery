import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import OwnerFoodCard from './MerchantFoodCart'; // component hiện món ăn
import { useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/v1/merchant/shop', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Không thể tải thông tin cửa hàng');
        const data = await res.json();
        setShop(data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchShop();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <Toaster position="top-center" />

      {/* Background gradient giống login merchant */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Nội dung chính */}
      <div className="relative z-10 w-full max-w-7xl p-6 md:p-10">
        {/* Tiêu đề cửa hàng */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {shop?.name || 'Cửa hàng của bạn'}
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý món ăn, cập nhật thông tin và theo dõi đơn hàng dễ dàng.
            </p>
          </div>

          <button
            onClick={() => navigate('/add-item')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-all duration-200"
          >
            + Thêm món ăn
          </button>
        </div>

        {/* Danh sách món ăn */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">
          Danh sách món ăn
        </h2>

        {shop?.items?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shop.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-orange-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <OwnerFoodCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">
            Hiện tại chưa có món ăn nào. Hãy thêm món đầu tiên nhé!
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
