require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Dummy product data
const products = [
  { id: 1, name: 'Banana Chips', price: 10000 }, // price in paise (₹100)
  { id: 2, name: 'Mixture', price: 8000 },       // ₹80
  { id: 3, name: 'Achappam', price: 12000 }      // ₹120
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Create Razorpay order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ error: 'Amount and receipt are required' });
    }

    const options = {
      amount: amount, // in paise
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Webhook for payment verification (optional)
app.post('/api/payment-verification', (req, res) => {
  // Verify signature here using Razorpay's recommended method
  // For now, just send 200 OK
  res.status(200).json({ status: 'success' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
