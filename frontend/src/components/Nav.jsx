import React, { useState } from 'react'; // SỬA: Xóa useEffect
import { MapPin, ShoppingCart, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setShop } from '../redux/userSlice';
// SỬA: Đổi đường dẫn import cho useAuth
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // SỬA: Lấy userData, logoutAction từ useAuth()
  const { userData, logoutAction } = useAuth();
  // SỬA: Chỉ lấy city, cartItems từ Redux
  const { city, cartItems, pendingOrdersCount } = useSelector(
    (state) => state.user,
  );

  const [showInfo, setShowInfo] = useState(false);

  // SỬA: Dùng logoutAction từ Context
  const handleLogOut = async () => {
    logoutAction();
    dispatch(setShop(null)); // Vẫn clear shop state trong Redux
  };

  return (
    // SỬA: Đổi justify-between (để đẩy 3 cụm ra xa)
    <div className="w-full h-20 flex items-center justify-between gap-6 px-5 fixed top-0 z-[9999] bg-white shadow-md overflow-visible">
      {/* 1. Logo (SỬA: Đổi màu) */}
      <h1
        onClick={() => navigate('/customer/home')}
        className="text-3xl font-bold text-green-500 cursor-pointer select-none" // Đổi thành text-green-500
      >
        Fastem
      </h1>

      {/* 2. Address Bar (SỬA: Thay thế Search Bar cũ) */}
      {userData?.role === 'user' && (
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm max-w-sm w-full">
            <span className="text-sm font-medium text-gray-500">Giao đến:</span>
            <MapPin className="w-5 h-5 text-red-500" />
            <div className="truncate text-gray-800 font-semibold text-sm">
              {city || 'Vui lòng chọn địa chỉ...'}
            </div>
          </div>
        </div>
      )}

      {/* 3. Right side (SỬA: Xóa toggle search) */}
      <div className="flex items-center gap-4">
        {/* Cart (Giữ nguyên) */}
        {userData?.role === 'user' && (
          <div
            className="relative cursor-pointer border border-gray-300 rounded-lg p-2 hover:bg-gray-100"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {cartItems?.length > 0 && (
              <span className="absolute -right-2 -top-3 bg-green-500 text-white text-xs font-semibold px-1.5 py-[1px] rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        )}

        {/* Avatar + menu (Giữ nguyên) */}
        <div className="relative">
          <div
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 text-white flex items-center justify-center cursor-pointer shadow-lg"
          >
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : userData?.fullName ? (
              <span className="text-lg font-semibold">
                {userData.fullName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User size={22} />
            )}
          </div>

          {showInfo && (
            <div className="absolute top-14 right-0 w-48 bg-white shadow-xl rounded-xl p-4 flex flex-col gap-3 z-50">
              <p className="text-base font-semibold text-gray-800 truncate">
                {userData?.fullName || 'Người dùng'}
              </p>
              {userData?.role === 'user' && (
                <button
                  onClick={() => navigate('/my-orders')}
                  className="text-green-600 font-medium text-left hover:underline"
                >
                  Đơn hàng của tôi
                </button>
              )}
              {/* SỬA: Đổi màu text */}
              <button
                onClick={handleLogOut}
                className="text-green-600 font-medium text-left hover:underline"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
