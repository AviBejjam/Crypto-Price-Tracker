const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import the created API routes
const stats = require('./routes/stats');
const deviation = require('./routes/deviation');

// Import the service for fetching crypto data (Task 1 functionality)
const fetchCryptoData = require('./services/fetchCryptoData');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start the background job for Task 1 once the connection is established
    start_Task1();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Background job to fetch data every 2 hours (Task 1)
const start_Task1 = () => {
  const run_task1 = async () => {
    try {
      console.log('Running background job to fetch cryptocurrency data...');
      await fetchCryptoData(); // Fetch crypto data
      console.log('Data fetched successfully.');
    } catch (error) {
      console.error('Error in background job:', error);
    }
    
    // Schedule the next run in 2 hours
    setTimeout(run_task1, 2 * 60 * 60 * 1000);
  };

  run_task1(); // Start the first job immediately
};

// Define routes
app.use('/', stats);
app.use('/', deviation);

// Default route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
