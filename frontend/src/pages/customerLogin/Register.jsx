import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    toast.success('Đăng ký thành công');

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* 1. Lớp ảnh nền (nằm dưới cùng) */}
      <div className="absolute inset-0 bg-[url('/food-delivery-bg.jpg')] bg-cover bg-center" />

      {/* 2. Lớp màu trắng đục phủ lên ảnh */}
      <div className="absolute inset-0 bg-white opacity-70" />
      <Toaster position="top-center" reverseOrder={false} />

      {/* Khung chính */}
      <div className="flex w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Bên trái */}
        <div className="w-1/2 inset-0 bg-[url('/img1.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-white p-10">
          <h2 className="text-3xl font-bold mb-3">FASTFOOD DELIVERY</h2>
          <p className="text-center text-sm opacity-90">
            Đăng ký để truy cập vào hệ thống đặt món nhanh chóng và tiện lợi.
          </p>
        </div>

        {/* Form đăng ký */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Đăng ký tài khoản
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-medium mb-1 text-left"
              >
                Tên người dùng
              </label>
              <input
                type="text"
                id="username"
                placeholder="Nhập tên của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1 text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1 text-left"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none bg-transparent"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium mb-1 text-left"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            outline-none pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none bg-transparent"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-all duration-200"
            >
              Đăng ký
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="text-emerald-600 font-medium hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
