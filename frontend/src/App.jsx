import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Category from './pages/merchant/Category';
import Login from './pages/customer/Login';
import Register from './pages/customer/Register';
import CustomerHome from './pages/customer/CustomerHome';
export const serverUrl = 'http://localhost:3000';

function App() {
  const user = JSON.parse(localStorage.getItem('user')); // kiểm tra đã đăng nhập

  return (
    <Router>
      {/* Login */}
      <Route path="/login/customer" element={<LoginCustomer />} />
      <Route path="/login/merchant" element={<LoginMerchant />} />
      <Route path="/login/admin" element={<LoginAdmin />} />

      {/* Register */}
      <Route path="/register/customer" element={<RegisterCustomer />} />
      <Route path="/register/merchant" element={<RegisterMerchant />} />

      {/* Sau khi đăng nhập */}
      <Route path="/customer/home" element={<CustomerHome />} />
      <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Router>
  );
}

export default App;
