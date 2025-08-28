import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Signin from './Signin';

const isLoggedIn = () => Boolean(localStorage.getItem('token'));

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn() ? <Navigate to="/app" /> : <Login />} />
        <Route path="/signin" element={isLoggedIn() ? <Navigate to="/app" /> : <Signin />} />
        <Route path="/app" element={isLoggedIn() ? <App /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isLoggedIn() ? "/app" : "/login"} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}