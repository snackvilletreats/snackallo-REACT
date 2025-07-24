import React from 'react';
import { createOrder, verifyPayment } from '../api';

export default function Cart({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, p) => sum + p.price, 0) * 100;

  const handlePay = async () => {
    const order = await createOrder(total);
    const options = {
      key: 'rzp_test_1234567890abcdef',
      amount: order.amount,
      order_id: order.id,
      handler: async res => {
        const result = await verifyPayment(res);
        alert(result.status);
        clearCart();
      },
      prefill: { email:'', contact:'' }
    };
    new window.Razorpay(options).open();
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> :
        <ul>
          {cart.map((p, i) => (
            <li key={i}>
              {p.name} – ₹{p.price}
              <button onClick={() => removeFromCart(i)}>Remove</button>
            </li>
          ))}
        </ul>
      }
      {cart.length > 0 && <button onClick={handlePay}>Pay ₹{total/100}</button>}
    </div>
  );
}
