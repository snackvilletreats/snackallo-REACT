import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await axios.post("https://your-backend-url.com/create-order", {
        amount: total * 100, // in paisa
      });

      const options = {
        key: "rzp_test_xxxxxx", // your Razorpay Key ID
        amount: response.data.amount,
        currency: "INR",
        name: "Snackallo",
        description: "Snack Purchase",
        order_id: response.data.id,
        handler: function (res) {
          alert("Payment successful! Payment ID: " + res.razorpay_payment_id);
          clearCart(); // Optional: clear cart after successful payment
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#F37254"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "1rem" }}>
                <strong>{item.name}</strong> - ₹{item.price} x 
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: "50px", margin: "0 10px" }}
                />
                = ₹{item.price * item.quantity}
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "10px" }}>
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button onClick={handleCheckout}>Proceed to Pay</button>
        </>
      )}
    </div>
  );
};

export default Cart;
