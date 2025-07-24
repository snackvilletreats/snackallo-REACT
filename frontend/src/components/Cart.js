import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/cart`)
      .then(res => setCartItems(res.data))
      .catch(err => console.error('Error fetching cart:', err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (productId, delta) => {
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/cart`, { productId, delta })
      .then(() => fetchCart())
      .catch(() => alert('Failed to update quantity'));
  };

  const removeItem = (productId) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}`)
      .then(() => fetchCart());
  };

  const handleCheckout = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-order`, { cart: cartItems })
      .then(res => {
        const order = res.data;
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: order.amount,
          currency: 'INR',
          name: 'Snackallo',
          description: 'Snack Purchase',
          order_id: order.id,
          handler: (response) => {
            alert("Payment Success!");
          },
          prefill: {
            name: "Customer Name",
            email: "test@example.com",
            contact: "9999999999"
          },
          theme: {
            color: "#F37254"
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch(err => alert('Checkout error'));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  </td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td><button onClick={() => removeItem(item.productId)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout}>Pay Now</button>
        </>
      )}
    </div>
  );
};

export default Cart;
