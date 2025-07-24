import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/about">About Us</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
