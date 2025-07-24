import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`)
      .then(response => setProducts(response.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const addToCart = (productId) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/cart`, { productId, quantity: 1 })
      .then(() => alert('Item added to cart!'))
      .catch(err => alert('Error adding to cart.'));
  };

  return (
    <div className="shop-container">
      <h2>Shop</h2>
      <div className="product-list">
        {products.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
