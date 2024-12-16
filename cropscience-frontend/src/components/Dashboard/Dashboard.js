import React, { useEffect, useState } from "react";
import { fetchCategories, fetchPopularProducts, searchProducts, fetchProductsByCategory } from "../../services/api";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]); // For category-specific products
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load categories and popular products on component mount
  useEffect(() => {
    loadCategories();
    loadPopularProducts();
  }, []);

  // Fetch categories
  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch popular products
  const loadPopularProducts = async () => {
    try {
      const response = await fetchPopularProducts();
      setPopularProducts(response);
    } catch (error) {
      console.error("Error fetching popular products:", error);
    }
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchProducts(searchTerm);
      setSearchResults(response);
      setCategoryProducts([]); // Clear category products if searching
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Fetch products for a selected category
  const loadProductsByCategory = async (categoryName) => {
    setSelectedCategory(categoryName); // Update selected category name
    setSearchResults([]); // Clear search results
    try {
      const response = await fetchProductsByCategory(categoryName);
      setCategoryProducts(response);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to CropScience Store</h1>
        <p>Find the best products for your agriculture needs.</p>
        <form onSubmit={handleSearch} className="hero-search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-card ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => loadProductsByCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products by Category */}
      {categoryProducts.length > 0 && (
        <div className="products-section">
          <h2>Products in {selectedCategory}</h2>
          <div className="product-list">
            {categoryProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular Products Section */}
      <div className="popular-products">
        <h2>Popular Products</h2>
        <div className="product-list">
          {popularProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
          {popularProducts.length === 0 && <p>No popular products available.</p>}
        </div>
      </div>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="product-list">
            {searchResults.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
