// src/server.js
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
