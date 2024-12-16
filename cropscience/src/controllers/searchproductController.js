const db = require('../config/db');

// Search products by name, description, or category
exports.searchProducts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  try {
    // SQL query to search products by name, description, or category name
    const [products] = await db.query(
      `
      SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category 
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
      `,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching your search query.' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Server error while searching products', error });
  }
};
