import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';

function App() {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (idx) => setCart(cart.filter((_, i) => i !== idx));
  const clearCart = () => setCart([]);

  return (
    <>
      <Navbar cartCount={cart.length} onNavigate={setView} />
      {view === 'home' && <Home />}
      {view === 'shop' && <Shop addToCart={addToCart} />}
      {view === 'cart' && <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />}
    </>
  );
}

export default App;
