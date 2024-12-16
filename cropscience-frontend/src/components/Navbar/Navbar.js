import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>CropScience</h2>
      </div>
      <div className="navbar-right">
        <Link to="/dashboard">All Products</Link>
        <Link to="/cart">
          <img
            src="/images/cart.jpg"
            alt="Cart"
            className="navbar-cart-icon"
          />
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
