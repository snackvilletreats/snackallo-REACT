const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for all origins (or restrict as needed)
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Sample product list (you can replace with DB or JSON file)
const products = [
  {
    id: 1,
    name: "Classic Banana Chips",
    price: 300,  // price per unit (INR)
    image: "https://example.com/images/banana-chips.jpg"
  },
  {
    id: 2,
    name: "Mixed Namkeen",
    price: 250,
    image: "https://example.com/images/mixed-namkeen.jpg"
  }
];

// Endpoint to get products (called from frontend shop)
app.get('/products', (req, res) => {
  res.json(products);
});

// Mock create order API for Razorpay (replace with real integration later)
app.post('/create-order', (req, res) => {
  const { amount } = req.body;
  console.log(`Received order create request for amount: ${amount}`);

  // Mock order response:
  const order = {
    id: "order_mock_123456",
    amount: amount,
    currency: "INR"
  };

  res.json(order);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
