import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Category from './pages/Category';
import Login from './pages/customerLogin/Login';
import Register from './pages/customerLogin/Register';
import CustomerHome from './pages/customerLogin/CustomerHome';
export const serverUrl = 'http://localhost:3000';

function App() {
  const user = JSON.parse(localStorage.getItem('user')); // kiểm tra đã đăng nhập

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" replace />}
        />
        <Route
          path="/home"
          element={user ? <CustomerHome /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
