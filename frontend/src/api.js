export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://your-backend-url.onrender.com';

export async function createOrder(amount) {
  const res = await fetch(`${BACKEND_URL}/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  return res.json();
}

export async function verifyPayment(response) {
  const res = await fetch(`${BACKEND_URL}/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response)
  });
  return res.json();
}
