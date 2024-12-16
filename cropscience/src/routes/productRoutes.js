const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

// Route to add a product (with image upload)
router.post('/add', upload.single('image'), productController.addProduct);

module.exports = router;
