const express = require('express');
const router = express.Router();
const searchproductController = require('../controllers/searchproductController');

// Route for searching products
router.get('/search', searchproductController.searchProducts);

module.exports = router;
