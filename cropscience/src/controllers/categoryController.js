const db = require('../config/db');

// Fetch all product categories
exports.getCategories = async (req, res) => {
  try {
    const [categories] = await db.query('SELECT name FROM categories');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Fetch products by category name
exports.getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    // Check if the category exists
    const [category] = await db.query('SELECT id FROM categories WHERE name = ?', [categoryName]);
    if (category.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const categoryId = category[0].id;

    // Fetch products under the specified category
    const [products] = await db.query('SELECT * FROM products WHERE category_id = ?', [categoryId]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products for the category', error });
  }
};
