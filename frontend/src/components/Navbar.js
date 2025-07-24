import React from 'react';

export default function Navbar({ cartCount, onNavigate }) {
  return (
    <header>
      <h1>Snackallo</h1>
      <nav>
        {['home','shop','cart'].map(v => (
          <button key={v} onClick={() => onNavigate(v)}>
            {v.charAt(0).toUpperCase() + v.slice(1)} {v === 'cart' && `(${cartCount})`}
          </button>
        ))}
      </nav>
    </header>
  );
}
