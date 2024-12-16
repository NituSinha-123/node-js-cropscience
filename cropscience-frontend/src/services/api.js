import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Reads API URL from .env file
});

// Register user or seller
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user or seller
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const fetchCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
  };
  
  export const fetchPopularProducts = async () => {
    const response = await api.get('/products/popular');
    return response.data;
  };
  
  export const searchProducts = async (query) => {
    const response = await api.get(`/products/search?query=${query}`);
    return response.data;
  };

  export const fetchProductsByCategory = async (categoryName) => {
    const response = await api.get(`/categories/${categoryName}/products`);
    return response.data;
  };
  
  
export default api;
