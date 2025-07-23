const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON bodies

const PORT = process.env.PORT || 10000;

// In-memory storage for mock orders
const orders = new Map();

/**
 * POST /create-order
 * Expects JSON body: { amount: number (in smallest currency unit), currency: string }
 * Returns a mock order object with id, amount, and currency
 */
app.post('/create-order', (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Amount and currency are required' });
  }

  // Generate a mock order id
  const mockOrderId = 'order_' + Math.random().toString(36).substring(2, 15);

  // Create mock order object
  const order = {
    id: mockOrderId,
    amount,
    currency,
    status: 'created',
  };

  // Save order in memory
  orders.set(mockOrderId, order);

  // Respond with mock order details
  res.json({
    id: mockOrderId,
    amount,
    currency,
  });
});

/**
 * POST /verify-payment
 * Expects JSON body: { order_id: string, payment_id: string, signature: string }
 * Simulates verification of payment and returns success response
 */
app.post('/verify-payment', (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  if (!order_id || !payment_id || !signature) {
    return res.status(400).json({ error: 'Missing payment verification details' });
  }

  const order = orders.get(order_id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Simulate payment verification success
  order.status = 'paid';

  res.json({
    status: 'success',
    message: 'Payment verified successfully (mock)',
    order_id,
    payment_id,
  });
});

// Optional health check route
app.get('/', (req, res) => {
  res.send('Mock Razorpay Payment Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
