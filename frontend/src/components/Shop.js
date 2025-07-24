// src/pages/Shop.js

import React from 'react';

const products = [
  {
    id: 1,
    name: 'Banana Chips',
    price: 100,
    image: '/images/banana-chips.jpg', // Place image in public/images/
  },
  {
    id: 2,
    name: 'Achappam',
    price: 120,
    image: '/images/achappam.jpg',
  },
  {
    id: 3,
    name: 'Mixture',
    price: 90,
    image: '/images/mixture.jpg',
  },
];

const Shop = ({ addToCart }) => {
  return (
    <div className="shop">
      <h2>Shop Our Snacks</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} width="150" height="150" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
