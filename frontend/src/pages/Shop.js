import React, { useState } from 'react';
import axios from 'axios';

const products = [
  {
    id: 1,
    name: 'Banana Chips',
    price: 100,
    image: '/images/banana-chips.jpg',
  },
  {
    id: 2,
    name: 'Mixture',
    price: 120,
    image: '/images/mixture.jpg',
  },
];

function Shop({ addToCart }) {
  return (
    <div>
      <h2>Shop</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={product.image} alt={product.name} width="150" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
