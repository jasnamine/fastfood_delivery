import axios from 'axios';
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setShop } from '../redux/userSlice';

export default function OwnerFoodCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${item._id}`,
        { withCredentials: true },
      );
      dispatch(setShop(result.data.shop));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg border border-orange-100 overflow-hidden transition-all duration-300">
      {/* Ảnh món ăn */}
      <div className="w-full h-40 bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <p>
            <span className="font-medium text-gray-700">Danh mục:</span>{' '}
            {item.category || 'N/A'}
          </p>
          <p>
            <span className="font-medium text-gray-700">Loại:</span>{' '}
            {item.type || 'N/A'}
          </p>
          <p>
            <span className="font-medium text-gray-700">Tình trạng:</span>{' '}
            {item.availability ? (
              <span className="text-green-600 font-semibold">Còn hàng</span>
            ) : (
              <span className="text-red-600 font-semibold">Hết hàng</span>
            )}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-orange-600 font-bold text-lg">
            ₹{item.price}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/editItem/${item._id}`)}
              className="p-2 rounded-full hover:bg-orange-50 text-orange-600 transition-colors"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full hover:bg-orange-50 text-orange-600 transition-colors"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
