import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import '../../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate(); // React Router navigation
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    isSeller: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        isSeller: formData.isSeller,
      };
      const response = await login(credentials);
      setMessage(response.message);
      navigate('/dashboard'); // Redirect to Dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone"
            value={formData.emailOrPhone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="seller-checkbox">
            <label htmlFor="isSeller">
              <input
                type="checkbox"
                id="isSeller"
                name="isSeller"
                checked={formData.isSeller}
                onChange={(e) =>
                  setFormData({ ...formData, isSeller: e.target.checked })
                }
              />
              Login as Seller
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
