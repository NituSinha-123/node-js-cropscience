const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Fetch all categories
router.get('/', categoryController.getCategories);

// Fetch products by category
router.get('/:categoryName/products', categoryController.getProductsByCategory);

module.exports = router;

