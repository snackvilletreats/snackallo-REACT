import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <nav style={{ padding: 20, backgroundColor: '#ffeeba' }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/about" style={{ marginRight: 10 }}>About Us</Link>
        <Link to="/shop" style={{ marginRight: 10 }}>Shop</Link>
        <Link to="/cart" style={{ marginRight: 10 }}>Cart</Link>
        <Link to="/contact" style={{ marginRight: 10 }}>Contact</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
