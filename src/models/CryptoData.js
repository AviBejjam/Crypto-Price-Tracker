const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
  coinId: String,
  symbol: String,
  name: String,
  current_price_usd: Number,
  market_cap_usd: Number,
  change_24h: Number,
  fetched_at: { type: Date, default: Date.now },
}, { collection: 'Task-1' });

const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);

module.exports = CryptoData;
