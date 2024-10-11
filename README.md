# Crypto Price Tracker

## Description

This project is a **Crypto Price Tracker** that fetches real-time cryptocurrency data from CoinGecko and stores it in a MongoDB database. It consists of two main components:

1. **Task 1**: A background service that fetches the current price, market cap, and 24-hour price change for three cryptocurrencies—Bitcoin, Ethereum, and Matic—every 2 hours, storing the data in MongoDB.
2. **Task 2**: An API `/stats` that returns the latest fetched data (price, market cap, and 24-hour price change) for a requested cryptocurrency.
3. **Task 3**: An API `/deviation` that calculates and returns the standard deviation of the price of the requested cryptocurrency based on the last 100 records stored in the database.

## Technologies Used

- **Node.js** with **Express** for building the API
- **Mongoose** for interacting with MongoDB
- **CoinGecko API** for fetching cryptocurrency data
- **MongoDB Atlas** as the database
- **Postman** for API testing

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB Atlas account** with a cluster set up
- **CoinGecko API key** (optional, depending on your setup)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/crypto-price-tracker.git
   cd crypto-price-tracker
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Set up environment variables**:

   Create a `.env` file in the root directory with the following variables:

   ```bash
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDB?retryWrites=true&w=majority
   COINGECKO_API_URL=https://api.coingecko.com/api/v3/simple/price
   COINGECKO_API_KEY=<your_coingecko_api_key>
   ```

   Replace `<username>`, `<password>`, and `<your_coingecko_api_key>` with your actual MongoDB credentials and CoinGecko API key (if applicable).
4. **Start the server**:

   ```bash
   node src/task-1.js
   ```

   The server will be running at `http://localhost:3001`.

## Project Structure

```
crypto-price-tracker/
│
├── src/
│   ├── index.js               # Main entry point
│   ├── models/
│   │   └── CryptoData.js      # Mongoose schema for storing cryptocurrency data
│   ├── services/
│   │   └── fetchCryptoData.js # Function to fetch cryptocurrency data from CoinGecko
│   ├── tasks/
│   │   ├── task-1.js          # Background job to fetch and store data every 2 hours
│   │   ├── task-2.js          # API for fetching the latest data for a requested coin
│   │   └── task-3.js          # API for calculating standard deviation of the last 100 records
├── .env                       # Environment variables
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## API Endpoints

### 1. **/stats** (GET)

Returns the latest data about a requested cryptocurrency (Bitcoin, Ethereum, or Matic).

- **URL**: `/stats`
- **Method**: GET
- **Query Params**:

  - `coin` (string): The coin identifier (`bitcoin`, `ethereum`, or `matic-network`)
- **Sample Request**:

  ```http
  GET http://localhost:3001/stats?coin=bitcoin
  ```
- **Sample Response**:

  ```json
  {
    "price": 59406,
    "marketCap": 1171965670481.403,
    "24hChange": -2.801544532978789
  }
  ```

### 2. **/deviation** (GET)

Returns the standard deviation of the price of a requested cryptocurrency based on the last 100 records stored in the database.

- **URL**: `/deviation`
- **Method**: GET
- **Query Params**:

  - `coin` (string): The coin identifier (`bitcoin`, `ethereum`, or `matic-network`)
- **Sample Request**:

  ```http
  GET http://localhost:3001/deviation?coin=bitcoin
  ```
- **Sample Response**:

  ```json
  {
    "deviation": 4082.48
  }
  ```

## Background Service

### Task 1: Fetch and Store Cryptocurrency Data

Every 2 hours, the server fetches data (current price, market cap, and 24-hour price change) for Bitcoin, Ethereum, and Matic using the CoinGecko API and stores it in the MongoDB database.

### How to Start the Background Job

The background job runs automatically as part of the server. To manually start the fetching process (for testing), run:

```bash
node src/services/fetchCryptoData.js
```

## Testing

To test the API endpoints, you can use **Postman** or **cURL**. For example:

### Using Postman:

1. Open Postman and create a new `GET` request.
2. Set the URL to `http://localhost:3001/stats?coin=bitcoin` to fetch the latest stats for Bitcoin.
3. Send the request and view the response.

This `README.md` provides a comprehensive overview of your project, how to install and run it, and how to use the API endpoints. Let me know if you'd like to modify any sections!
