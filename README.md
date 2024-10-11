# Crypto Price Tracker

## Description

This project is a **Crypto Price Tracker** that fetches real-time cryptocurrency data from CoinGecko and stores it in a MongoDB database. It consists of two main components:

1. **Task 1**: A background service that fetches the current price, market cap, and 24-hour price change for three cryptocurrencies—Bitcoin, Ethereum, and Matic—every 2 hours, storing the data in MongoDB.
2. **Task 2**: An API `/stats` that returns the latest fetched data (price, market cap, and 24-hour price change) for a requested cryptocurrency.
3. **Task 3**: An API `/deviation` that calculates and returns the standard deviation of the price of the requested cryptocurrency based on the last 100 records stored in the database.

## Technologies Used

- **Node.js** with **Express** for building the API
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
   git clone https://github.com/AviBejjam/Crypto-Price-Tracker.git
   cd crypto-price-tracker
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Set up environment variables**:

   Create a `.env` file in the root directory with the following variables:

   ```bash
   MONGO_URI
   COINGECKO_API_KEY
   ```

   Replace the variables with your actual MongoDB credentials and CoinGecko API key (if applicable).
4. **Start the server**:

   ```bash
   node src/index.js
   ```

   The server will be running at `http://localhost:3000`.

## API Endpoints

### 1. **/stats** (GET)

Returns the latest data about a requested cryptocurrency (Bitcoin, Ethereum, or Matic).

- **URL**: `/stats`
- **Method**: GET
- **Query Params**:

  - `coin` (string): The coin identifier (`bitcoin`, `ethereum`, or `matic-network`)
- **Sample Request**:

  ```http
  GET http://localhost:3000/stats?coin=bitcoin
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

## Testing

To test the API endpoints, you can use **Postman** or **cURL**. For example:

### Using Postman:

1. Open Postman and create a new `GET` request.
2. Set the URL to `http://localhost:3001/stats?coin=bitcoin` to fetch the latest stats for Bitcoin.
3. Send the request and view the response.

This `README.md` provides a comprehensive overview of your project, how to install and run it, and how to use the API endpoints. Let me know if you'd like to modify any sections!
