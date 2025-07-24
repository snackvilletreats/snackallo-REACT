import React from 'react';

export default function Home() {
  return (
    <section className='hero'>
      <h2>Pure Kerala Taste in Every Bite!</h2>
      <p>Authentic snacks made with love.</p>
      <button onClick={() => document.querySelector('button').click()}>
        Shop Now
      </button>
    </section>
  );
}
