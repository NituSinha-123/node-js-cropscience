import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../services/api';
import '../../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    role: 'user', // Default to user
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setMessage(response.message);
      setFormData({ fullname: '', email: '', phone: '', password: '', role: 'user' }); // Clear form
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
          <button type="submit">Register</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p>
          Already registered?{' '}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
