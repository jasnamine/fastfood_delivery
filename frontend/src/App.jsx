import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Category from './pages/merchant/Category';
import LoginCustomer from './pages/customer/LoginCustomer';
import LoginMerchant from './pages/merchant/LoginMerchant';
import RegisterCustomer from './pages/customer/RegisterCustomer';
import RegisterMerchant from './pages/merchant/RegisterMerchant';
import VerifyOTP from './components/Verify';
import CustomerHome from './pages/customer/CustomerHome';
export const serverUrl = 'http://localhost:3000';

function App() {
  const user = JSON.parse(localStorage.getItem('user')); // kiểm tra đã đăng nhập

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login/customer" replace />} />
        {/* Login */}
        <Route path="/login/customer" element={<LoginCustomer />} />
        <Route path="/login/merchant" element={<LoginMerchant />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        {/* Register */}
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/merchant" element={<RegisterMerchant />} />
        <Route path="/register/customer/verifyOTP" element={<VerifyOTP />} />

        {/* Home*/}
      </Routes>
    </Router>
  );
}

export default App;
