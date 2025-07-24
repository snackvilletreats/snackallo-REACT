import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const addToCart = (product) => {
    setCart(prev => ({
      ...prev,
      [product.id]: prev[product.id] ? { ...product, quantity: prev[product.id].quantity + 1 } : { ...product, quantity: 1 }
    }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop</h2>
      {products.map(p => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <img src={p.image} alt={p.name} width="100" /><br />
          {p.name} - ₹{p.price}<br />
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Shop;
