// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const searchproductRoutes = require('./routes/searchproductRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/products', productRoutes);
app.use('/api/products', searchproductRoutes);

module.exports = app;
