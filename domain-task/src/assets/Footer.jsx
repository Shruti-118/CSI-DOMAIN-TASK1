import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" to="/">SHOP<span>Holic</span></Link>
          <p>Simple, modern shopping built with React.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/products">All products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/profile">Profile</Link>
          <Link to="/checkout">Checkout</Link>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} SHOPHolic. Demo store.</div>
    </footer>
  );
}
