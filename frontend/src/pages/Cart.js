import React from 'react';
import axios from 'axios';

function Cart({ cartItems, setCartItems }) {
  const handleIncrease = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const handleDecrease = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1); // remove item if quantity becomes 0
    }
    setCartItems(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const response = await axios.post('https://your-backend-url.com/create-order', {
        amount: totalAmount * 100, // Razorpay expects paisa
      });

      const options = {
        key: "rzp_test_xxxxxx", // Replace with real Razorpay key
        amount: response.data.amount,
        currency: "INR",
        name: "Snackallo",
        description: "Snack Purchase",
        order_id: response.data.id,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9876543210"
        },
        theme: {
          color: "#F37254"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <p>
                Quantity:{" "}
                <button onClick={() => handleDecrease(index)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrease(index)}>+</button>
              </p>
              <button onClick={() => handleRemove(index)} style={{ color: 'red' }}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{totalAmount}</h3>
          <button onClick={handleCheckout} style={{ padding: '10px 20px' }}>Proceed to Pay</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
