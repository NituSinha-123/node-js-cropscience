const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes for authentication
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
