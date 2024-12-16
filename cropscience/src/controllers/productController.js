const db = require('../config/db');

// Add a new product
exports.addProduct = async (req, res) => {
  const { category_id, name, description, price, stock } = req.body;
  const image = req.file; // Multer adds this to the request object

  // Validate inputs
  if (!category_id || !name || !price || !stock || !image) {
    return res.status(400).json({ message: 'Category, name, price, stock, and image are required.' });
  }

  if (price <= 0) {
    return res.status(400).json({ message: 'Price must be greater than 0.' });
  }

  if (stock < 0) {
    return res.status(400).json({ message: 'Stock cannot be negative.' });
  }

  try {
    // Check if the category exists
    const [category] = await db.query('SELECT * FROM categories WHERE id = ?', [category_id]);
    if (category.length === 0) {
      return res.status(404).json({ message: 'Invalid category.' });
    }

    // Get the image URL
    const imageUrl = `/uploads/${image.filename}`;

    // Insert the product into the database
    await db.query(
      'INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [category_id, name, description, price, stock, imageUrl]
    );

    res.status(201).json({ message: 'Product added successfully.' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product.', error });
  }
};
