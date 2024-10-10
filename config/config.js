// config/config.js
require('dotenv').config();
module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: 'mongodb://localhost/social_media_db',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key' // Use environment variable in production
  };