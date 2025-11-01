import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Khởi tạo Context
const AuthContext = createContext(null);

// Hàm giải mã JWT bằng JavaScript có sẵn (thay thế thư viện)
const decodeJwtPayload = (token) => {
  try {
    // Token JWT có 3 phần, ngăn cách bởi dấu "."
    // Chúng ta cần phần thứ 2 (payload)
    const payloadBase64 = token.split('.')[1];

    // Cần chuẩn hóa Base64URL
    const normalizedPayload = payloadBase64
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Giải mã Base64 (atob) và parse JSON
    const decodedPayload = atob(normalizedPayload);
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error('Giải mã JWT thất bại', e);
    return null;
  }
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm state loading
  const navigate = useNavigate();

  // 1. Khi App khởi động, đọc "session" từ localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user && user !== 'undefined') {
      try {
        setUserData(JSON.parse(user));
      } catch (err) {
        console.error('Lỗi parse user từ localStorage:', err);
        localStorage.clear(); // Xóa nếu bị lỗi
      }
    }
    setLoading(false); // Báo là đã load xong
  }, []);

  // 2. Hàm đăng nhập (ĐÃ SỬA)
  const loginAction = (data) => {
    try {
      // API response có dạng { data: { accessToken: "..." } }
      if (data && data.data && data.data.accessToken) {
        const token = data.data.accessToken;

        // SỬA: Dùng hàm giải mã "cây nhà lá vườn"
        const decodedUser = decodeJwtPayload(token);

        if (!decodedUser) {
          throw new Error('Token JWT không hợp lệ hoặc không thể giải mã');
        }

        // Lưu cả token và user (đã giải mã) vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decodedUser));

        // Cập nhật state
        setUserData(decodedUser);

        console.log('loginAction thành công:', decodedUser);
        return true; // Báo hiệu thành công
      } else {
        // Dữ liệu API trả về không đúng cấu trúc
        throw new Error('API response không có accessToken');
      }
    } catch (error) {
      console.error('loginAction thất bại:', error.message, data);
      localStorage.clear();
      setUserData(null);
      return false; // Báo hiệu thất bại
    }
  };

  // 3. Hàm đăng xuất
  const logoutAction = () => {
    localStorage.clear();
    setUserData(null);
    navigate('/login/customer');
  };

  // 4. Cung cấp value cho toàn App
  const value = {
    userData,
    loading, // Cung cấp loading state
    loginAction,
    logoutAction,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Chỉ render App khi đã load xong session */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
