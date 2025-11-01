// MerchantLogin.js
import Login from '../../components/LoginPage';

const MerchantLogin = () => (
  <Login
    userType="merchant"
    redirectPath="/merchant-home"
    theme={{
      primaryColor: 'orange',
      bgGradient: 'from-orange-500 to-red-500',
      bgImage: '',
      title: 'Merchant Login',
      description: 'Đăng nhập để quản lý cửa hàng, món ăn và đơn hàng của bạn.',
      registerLink: '/register-merchant',
    }}
  />
);

export default MerchantLogin;
