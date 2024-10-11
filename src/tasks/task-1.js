const connectDB = require('../config/db');
const fetchCryptoData = require('../services/fetchCryptoData');

// Connect to MongoDB
connectDB();

// Function to run every 2 hours
const runTask_1 = async () => {
  await fetchCryptoData(); 
  setTimeout(runJob, 2 * 60 * 60 * 1000); // Schedule the next run for 2 hours later
};

runTask_1(); // Start the first job

