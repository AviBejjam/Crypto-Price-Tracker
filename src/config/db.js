// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // This should be present at the top

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI; // Make sure this is loaded
    if (!MONGO_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
