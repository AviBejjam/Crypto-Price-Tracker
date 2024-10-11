const express = require('express');
const router = express.Router();
const CryptoData = require('../models/CryptoData');

// Function to calculate the standard deviation
const calculateStandardDeviation = (prices) => {
  const n = prices.length;
  const mean = prices.reduce((a, b) => a + b, 0) / n;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return Math.sqrt(variance);
};

// Router to deviation
router.get('/deviation', async (req, res) => {
  const coin = req.query.coin;

  if (!coin) {
    return res.status(400).json({ error: 'Please specify a coin (bitcoin, ethereum, matic-network)' });
  }

  try {
    // Fetch the last 100 records for the requested coin
    const records = await CryptoData.find({ coinId: coin })
      .sort({ fetched_at: -1 })  // Sort by fetched_at in descending order to get the most recent records
      .limit(100);  // Limit to the last 100 records

    if (records.length === 0) {
      return res.status(404).json({ error: `No data found for ${coin}` });
    }

    // Extract the prices from the records
    const prices = records.map(record => record.current_price_usd);

    // Calculate the standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Return the result
    return res.json({ deviation: deviation.toFixed(2) });

  } catch (error) {
    console.error('Error calculating standard deviation:', error);
    return res.status(500).json({ error: 'Server error, please try again later' });
  }
});

module.exports = router;
