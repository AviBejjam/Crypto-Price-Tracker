const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const deviationRoute = require('../routes/deviation'); // Import the stats route

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware for parsing JSON
app.use(express.json());

// Use the stats route
app.use('/', deviationRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
