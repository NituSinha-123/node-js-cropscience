const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  const { fullname, email, phone, password, role } = req.body;

  // Validate input fields
  if (!fullname || !email || !phone || !password || !role) {
    return res.status(400).json({ message: 'All fields are required, including role' });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ? OR phone = ?', [email, phone]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database with role
    await db.query(
      'INSERT INTO users (fullname, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
      [fullname, email, phone, hashedPassword, role]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  if (!emailOrPhone || !password) {
    return res.status(400).json({ message: 'Email/Phone and password are required' });
  }

  try {
    // Check if the user exists
    const [user] = await db.query('SELECT * FROM users WHERE email = ? OR phone = ?', [emailOrPhone, emailOrPhone]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token including user ID and role
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token, role: user[0].role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Logout user (invalidate token)
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};
