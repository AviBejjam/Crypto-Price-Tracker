const CryptoData = require('../models/CryptoData');
require('dotenv').config();

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const CURRENCY = 'usd';

const fetchCryptoData = async () => {
  const fetch = (await import('node-fetch')).default;

  const ids = COINS.join(',');
  const url = `${process.env.COINGECKO_API_URL}?ids=${ids}&vs_currencies=${CURRENCY}&include_market_cap=true&include_24hr_change=true`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-api-key': process.env.COINGECKO_API_KEY, // Add the API key here if needed
      },
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    const data = await response.json();

    const timestamp = new Date();

    const cryptoEntries = COINS.map((coinId) => {
      const coinData = data[coinId];
      return {
        coinId,
        symbol: coinId === 'matic-network' ? 'MATIC' : coinId.toUpperCase(),
        name:
          coinId === 'bitcoin'
            ? 'Bitcoin'
            : coinId === 'ethereum'
            ? 'Ethereum'
            : 'Matic Network',
        current_price_usd: coinData[CURRENCY],
        market_cap_usd: coinData[`${CURRENCY}_market_cap`],
        change_24h: coinData[`${CURRENCY}_24h_change`],
        fetched_at: timestamp,
      };
    });

    // Save each entry to the database
    await CryptoData.insertMany(cryptoEntries);
    console.log(`Fetched and stored data at ${timestamp.toISOString()}`);
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

module.exports = fetchCryptoData;
