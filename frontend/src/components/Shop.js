import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Banana Chips', price: 100, image: '/banana-chips.jpg' },
  { id: 2, name: 'Mixture', price: 80, image: '/mixture.jpg' },
  { id: 3, name: 'Achappam', price: 120, image: '/achappam.jpg' },
];

export default function Shop({ addToCart }) {
  return (
    <div className="product-list">
      {products.map(p => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}
