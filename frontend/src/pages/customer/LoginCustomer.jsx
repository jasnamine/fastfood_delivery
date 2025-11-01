// CustomerLogin.js
import Login from '../../components/LoginPage';

const CustomerLogin = () => (
  <Login
    userType="customer"
    redirectPath="/customer/home"
    theme={{
      primaryColor: 'emerald',
      bgGradient: 'from-emerald-500 to-green-500',
      bgImage: "url('/img1.jpg')",
      title: 'FASTFOOD DELIVERY',
      description:
        'Đăng nhập để truy cập vào hệ thống đặt món nhanh chóng và tiện lợi.',
      registerLink: '/register/customer',
    }}
  />
);

export default CustomerLogin;
