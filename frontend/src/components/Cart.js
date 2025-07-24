// src/pages/Cart.js

import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart, handleCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="100" />
              <div>
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <p>
                  Quantity:
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span> {item.quantity} </span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout}>Proceed to Pay</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
