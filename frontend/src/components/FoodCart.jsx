import React, { useState, useEffect } from 'react';
// 1. Thay thế icon
import { Minus, Plus, ShoppingCart, Drumstick, Leaf, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../redux/userSlice';

function FoodCard({ data }) {
  const { cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // 2. Sửa lỗi Logic: Tìm item trong cart để khởi tạo state
  const cartItem = cartItems.find((item) => item.id === data._id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  // 2. Sửa lỗi Logic: Đồng bộ state nếu cart thay đổi
  useEffect(() => {
    const itemInCart = cartItems.find((item) => item.id === data._id);
    setQuantity(itemInCart ? itemInCart.quantity : 0);
  }, [cartItems, data._id]);

  // 2. Sửa lỗi Logic: Nút này CHỈ thay đổi state cục bộ
  const handleIncrease = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  // 2. Sửa lỗi Logic: Nút này CHỈ thay đổi state cục bộ
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  // 2. Sửa lỗi Logic: Nút này xử lý việc "add" hoặc "update"
  const handleSyncToCart = () => {
    const itemInCart = cartItems.find((item) => item.id === data._id);

    if (itemInCart) {
      // Nếu đã có, dispatch update (kể cả khi quantity = 0, nó sẽ bị xóa)
      dispatch(updateQuantity({ id: data._id, quantity: quantity }));
    } else if (quantity > 0) {
      // Nếu chưa có và quantity > 0, thì add mới
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          shop: data.shop,
          price: data.price,
          quantity,
          image: data.image,
          type: data.type,
        }),
      );
    }
    // Nếu chưa có và quantity = 0, không làm gì cả
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          // 1. Thay icon (Star filled)
          <Star
            key={i}
            className="text-yellow-400"
            fill="currentColor"
            size={16}
          />
        ) : (
          // 1. Thay icon (Star outline)
          <Star key={i} className="text-yellow-400" size={16} />
        ),
      );
    }
    return stars;
  };

  const itemIsInCart = cartItems.some((i) => i.id === data._id);

  return (
    // 3. Thay đổi style: w-64, border-gray-200, hover, group
    <div className="group w-64 rounded-2xl border-2 border-gray-200 bg-white shadow-md overflow-hidden hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col">
      {/* Image & top icons */}
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white overflow-hidden">
        {/* Veg/Non-Veg Icon */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow z-10">
          {data.type === 'veg' ? (
            // 1. Thay icon
            <Leaf className="text-green-600" size={18} />
          ) : (
            // 1. Thay icon
            <Drumstick className="text-red-600" size={18} />
          )}
        </div>

        <img
          src={data.image}
          alt={data.name}
          // 3. Thêm group-hover
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars(Math.round(data.rating?.average || 0))}
          <span className="text-xs text-gray-500">
            ({data.rating?.count || 0})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="font-bold text-gray-900 text-lg">₹{data.price}</span>

          {/* Quantity & Cart Button */}
          <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 hover:bg-gray-100 transition"
            >
              {/* 1. Thay icon */}
              <Minus size={12} />
            </button>
            <span className="px-2 text-sm font-medium">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 hover:bg-gray-100 transition"
            >
              {/* 1. Thay icon */}
              <Plus size={12} />
            </button>

            {/* 3. Thay đổi style và logic (màu sắc, onClick) */}
            <button
              className={`${
                itemIsInCart
                  ? 'bg-emerald-700' // Đã có trong giỏ (xanh đậm)
                  : 'bg-emerald-600' // Thêm mới (xanh thường)
              } text-white px-3 py-2 transition-colors hover:bg-emerald-800`}
              onClick={handleSyncToCart}
            >
              {/* 1. Thay icon */}
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
