import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
      <div>
        {!hideNavbar && <Navbar />}
        {children}
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;
