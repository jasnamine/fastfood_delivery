import React, { useEffect, useState } from 'react';
// 1. Thay đổi icon sang lucide-react
import { MapPin, Search, ShoppingCart, X, Plus, Receipt } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../App';
import axios from 'axios';
import { setSearchItems, setShop, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const { city, userData, cartItems, pendingOrdersCount } = useSelector(
    (state) => state.user,
  );
  const [showSearch, setShowSearch] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setShop(null));
      navigate('/signin'); // Giả sử bạn có route /signin cho trang Login
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search-items?city=${city}&query=${input}`,
        { withCredentials: true },
      );
      dispatch(setSearchItems(result.data));
    } catch (error) {
      dispatch(setSearchItems(null));
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearchItems();
    } else {
      dispatch(setSearchItems(null));
    }
  }, [input]);

  return (
    // 2. Thay đổi nền Nav, chiều cao và padding
    <div className="w-full h-20 flex items-center justify-between md:justify-center gap-6 px-5 fixed top-0 z-[9999] bg-white shadow-md overflow-visible">
      {/* Mobile Search Box */}
      {showSearch && userData?.role === 'user' && (
        // 3. Chuẩn hóa shadow, h, top, gap
        <div className="w-[90%] h-16 bg-white shadow-lg rounded-lg items-center gap-4 z-[9999] flex fixed left-[5%] top-20 p-2">
          <div className="flex items-center w-[30%] overflow-hidden gap-2 px-2 border-r-2 border-gray-300">
            {/* 4. Thay đổi icon và màu */}
            <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="w-full truncate text-gray-600 text-sm">
              {city || 'searching..'}
            </div>
          </div>
          <div className="w-[70%] flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-2 text-gray-700 outline-0 w-full"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>
        </div>
      )}

      {/* Logo */}
      {/* 4. Thay đổi màu logo */}
      <h1 className="text-3xl font-bold text-emerald-600">Vingo</h1>

      {/* Desktop Search Box */}
      {userData?.role === 'user' && (
        // 3. Chuẩn hóa shadow, h, gap
        <div className="md:w-[60%] lg:w-[40%] h-16 bg-white shadow-lg rounded-lg items-center gap-4 hidden md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-2 px-3 border-r-2 border-gray-300">
            {/* 4. Thay đổi icon và màu */}
            <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="w-full truncate text-gray-600">
              {city || 'searching..'}
            </div>
          </div>
          <div className="w-[70%] flex items-center gap-2 px-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-2 text-gray-700 outline-0 w-full"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>
        </div>
      )}

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Mobile search toggle */}
        {userData?.role === 'user' &&
          (!showSearch ? (
            <Search
              className="w-6 h-6 text-emerald-600 md:hidden cursor-pointer" // 4. Thay icon và màu
              onClick={() => setShowSearch(true)}
            />
          ) : (
            <X
              className="w-6 h-6 text-emerald-600 md:hidden cursor-pointer" // 4. Thay icon và màu
              onClick={() => setShowSearch(false)}
            />
          ))}

        {/* Role Based UI */}
        {userData?.role === 'owner' ? (
          <>
            {/* Add Food Item */}
            <button
              onClick={() => navigate('/additem')}
              // 5. Thay đổi màu nền/text
              className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-emerald-100 text-emerald-600"
            >
              <Plus size={16} /> {/* 4. Thay icon */}
              <span className="text-sm font-medium">Add Food Item</span>
            </button>
            <button
              onClick={() => navigate('/additem')}
              // 5. Thay đổi màu nền/text
              className="flex md:hidden items-center justify-center p-2 cursor-pointer rounded-full bg-emerald-100 text-emerald-600"
            >
              <Plus size={18} /> {/* 4. Thay icon */}
            </button>

            {/* Pending Orders */}
            <div
              // 5. Thay đổi màu nền/text
              className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-emerald-100 text-emerald-600 font-medium"
              onClick={() => navigate('/pending-orders')}
            >
              <Receipt className="w-5 h-5" /> {/* 4. Thay icon */}
              <span className="text-sm">My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-emerald-600 rounded-full px-[6px] py-[1px]">
                {pendingOrdersCount}
              </span>
            </div>
            <div
              // 5. Thay đổi màu nền/text
              className="flex md:hidden items-center justify-center relative p-2 rounded-full bg-emerald-100 text-emerald-600"
              onClick={() => navigate('/pending-orders')}
            >
              <Receipt className="w-5 h-5" /> {/* 4. Thay icon */}
              {/* 3. Chuẩn hóa text, padding */}
              <span className="absolute -right-1 -top-1 text-xs font-bold text-white bg-emerald-600 rounded-full px-1">
                {pendingOrdersCount}
              </span>
            </div>
          </>
        ) : userData?.role === 'deliveryBoy' ? (
          <button
            onClick={() => navigate('/my-delivered-orders')}
            // 5. Thay đổi màu nền/text
            className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-600 text-sm font-medium"
          >
            My Orders
          </button>
        ) : (
          <>
            {/* User Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate('/cart')}
            >
              {/* 4. Icon đã đúng (lucide) */}
              <ShoppingCart className="w-6 h-6 text-emerald-600" />
              {/* 3. Chuẩn hóa vị trí, màu */}
              <span className="absolute -right-2 -top-3 text-emerald-600 text-sm font-semibold">
                {cartItems?.length}
              </span>
            </div>

            {/* User Orders → only desktop */}
            {userData?.role === 'user' && (
              <button
                onClick={() => navigate('/my-orders')}
                // 5. Thay đổi màu nền/text
                className="hidden md:block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-600 text-sm font-medium"
              >
                My Orders
              </button>
            )}
          </>
        )}

        {/* Profile icon + Popup */}
        <div className="relative overflow-visible">
          <div
            // 3. Chuẩn hóa w, h, text, bg
            className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-600 text-white text-lg shadow-lg font-semibold cursor-pointer"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            {userData?.fullName?.slice(0, 1)}
          </div>

          {showInfo && (
            // 3. Chuẩn hóa top, w, p, gap
            <div className="fixed top-20 right-[10px] md:right-[10%] lg:right-[25%] w-44 bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-3 z-[9999]">
              {/* 3. Chuẩn hóa text */}
              <div className="text-base font-semibold text-gray-800">
                {userData?.fullName}
              </div>

              {/* Mobile: My Orders */}
              {userData?.role === 'user' && (
                <div
                  // 5. Thay đổi màu text
                  className="md:hidden text-emerald-600 font-semibold cursor-pointer"
                  onClick={() => {
                    setShowInfo(false);
                    navigate('/my-orders');
                  }}
                >
                  My Orders
                </div>
              )}

              <div
                // 5. Thay đổi màu text
                className="text-emerald-600 font-semibold cursor-pointer"
                onClick={handleLogOut}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
