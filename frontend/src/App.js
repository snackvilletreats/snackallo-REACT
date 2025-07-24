// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (total === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const response = await axios.post('https://your-backend-url.com/create-order', {
        amount: total * 100, // Razorpay expects amount in paisa
      });

      const options = {
        key: "rzp_test_xxxxxx", // Replace with your Razorpay test key
        amount: response.data.amount,
        currency: "INR",
        name: "Snackallo",
        description: "Snack Purchase",
        order_id: response.data.id,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "email@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    }
  };

 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
