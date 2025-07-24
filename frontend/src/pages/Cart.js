import React from 'react';

function Cart({ cart, updateQuantity, removeFromCart, handleCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item, index) => (
            <div key={index}>
              <p><strong>{item.name}</strong></p>
              <p>Price: ₹{item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '50px', marginLeft: '10px' }}
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </p>
              <hr />
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout}>Pay Now</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
