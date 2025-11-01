import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './pages/merchant/Category';
import LoginCustomer from './pages/customer/LoginCustomer';
import LoginMerchant from './pages/merchant/LoginMerchant';
import RegisterCustomer from './pages/customer/RegisterCustomer';
import RegisterMerchant from './pages/merchant/RegisterMerchant';
import VerifyOTP from './components/Verify';
import CustomerHome from './pages/customer/CustomerHome';
import { AuthProvider, useAuth } from './context/AuthContext';
export const serverUrl = 'http://localhost:3000';

function ProtectedRoute({ children }) {
  const { userData } = useAuth();

  if (!userData) {
    return <Navigate to="/login/customer" replace />;
  }
  return children;
}

function App() {
  let user = null;
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user');
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/customer" replace />} />
      {/* Login */}
      <Route path="/login/customer" element={<LoginCustomer />} />
      <Route path="/login/merchant" element={<LoginMerchant />} />
      <Route
        path="/customer/home"
        element={
          <ProtectedRoute>
            <CustomerHome />
          </ProtectedRoute>
        }
      />
      {/* Register */}
      <Route path="/register/customer" element={<RegisterCustomer />} />
      <Route path="/register/merchant" element={<RegisterMerchant />} />
      <Route path="/register/customer/verifyOTP" element={<VerifyOTP />} />

      {/* Home*/}
    </Routes>
  );
}

export default App;
