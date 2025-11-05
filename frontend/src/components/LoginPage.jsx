import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Login = ({
  userType = 'customer', // 'customer' hoặc 'merchant'
  loginEndpoint = 'http://localhost:3000/api/v1/auth/login',
  redirectPath = '/customer/home',
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sai email hoặc mật khẩu');

      localStorage.setItem('token', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', userType);

      toast.success('Đăng nhập thành công');
      setTimeout(() => navigate(redirectPath), 1000);
    } catch (error) {
      toast.error(error.message || 'Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  const primaryColor = userType === 'merchant' ? 'orange' : 'emerald';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background full màn hình */}
      {userType === 'customer' ? (
        <>
          <div className="absolute inset-0 w-full h-full bg-[url('/food-delivery-bg.jpg')] bg-center bg-cover bg-no-repeat" />
          <div className="absolute inset-0 w-full h-full bg-white/70 backdrop-blur-sm" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 w-full h-full bg-[url('/food-delivery-bg.jpg')] bg-center bg-cover bg-no-repeat" />
          <div className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-sm" />
        </>
      )}

      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {/* Left side */}
        <div
          className={clsx(
            'w-full md:w-1/2 flex flex-col justify-center items-center text-white p-10 relative',
            userType === 'merchant' ? '' : '',
          )}
          style={
            userType === 'customer'
              ? {
                  backgroundImage: "url('/img1.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          <h2 className="text-4xl font-bold mb-4 text-center z-10 relative">
            {userType === 'merchant' ? 'MERCHANT PORTAL' : 'FASTFOOD DELIVERY'}
          </h2>
          <p className="text-center text-sm opacity-90 z-10 relative">
            {userType === 'merchant'
              ? 'Đăng nhập để quản lý cửa hàng, món ăn và đơn hàng của bạn.'
              : 'Đăng nhập để truy cập vào hệ thống đặt món nhanh chóng và tiện lợi.'}
          </p>
        </div>

        {/* Right side: Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            {userType === 'merchant'
              ? 'Đăng nhập tài khoản Merchant'
              : 'Đăng nhập tài khoản'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={
                  userType === 'merchant'
                    ? 'merchant@example.com'
                    : 'Nhập email của bạn'
                }
                className={clsx(
                  'w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2',
                  `focus:ring-${primaryColor}-500`,
                )}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className={clsx(
                    'w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2',
                    `focus:ring-${primaryColor}-500`,
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 bg-transparent focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                'w-full font-semibold py-2 rounded-lg text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                primaryColor === 'emerald' &&
                  'bg-emerald-600 hover:bg-emerald-700',
                primaryColor === 'orange' &&
                  'bg-orange-600 hover:bg-orange-700',
              )}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Chưa có tài khoản?{' '}
            <Link
              to={
                userType === 'merchant'
                  ? '/register/merchant'
                  : '/register/customer'
              }
              className={clsx(
                'font-medium hover:underline',
                primaryColor === 'emerald' && 'text-emerald-600',
                primaryColor === 'orange' && 'text-orange-600',
              )}
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
