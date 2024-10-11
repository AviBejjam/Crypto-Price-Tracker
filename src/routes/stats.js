const express = require('express');
const router = express.Router();
const CryptoData = require('../models/CryptoData');  

router.get('/stats', async (req, res) => {
  const coin = req.query.coin;

  if (!coin) {
    return res.status(400).json({ error: 'Please specify a coin (bitcoin, ethereum, matic-network)' });
  }

  try {
    // Fetch the most recent data for the requested coin
    const latestData = await CryptoData.findOne({ coinId: coin })
      .sort({ fetched_at: -1 });  // Sort by 'fetched_at' in descending order to get the latest entry

    if (!latestData) {
      return res.status(404).json({ error: `No data found for ${coin}` });
    }

    // Respond with the latest data
    return res.json({
      price: latestData.current_price_usd,
      marketCap: latestData.market_cap_usd,
      '24hChange': latestData.change_24h,
    });

  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return res.status(500).json({ error: 'Server error, please try again later' });
  }
});

module.exports = router;
