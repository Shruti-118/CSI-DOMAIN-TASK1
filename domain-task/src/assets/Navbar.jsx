import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const { cart, wishlist, user } = useStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setOpen(false);
  };
    return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/">SHOP<span>Holic</span></Link>

        <form className="nav-search" onSubmit={submitSearch}>
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />
        </form>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <NavLink to="/products" onClick={() => setOpen(false)}>Shop</NavLink>
          <NavLink to="/wishlist" onClick={() => setOpen(false)}>
            <Heart size={18} /> Wishlist {wishlist.length > 0 && <b>{wishlist.length}</b>}
          </NavLink>
          <NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink>
          <NavLink to={user.loggedIn ? "/profile" : "/profile"} onClick={() => setOpen(false)}>
            <User size={18} /> {user.loggedIn ? user.name.split(" ")[0] : "Login"}
          </NavLink>
          <Link className="cart-link" to="/cart" onClick={() => setOpen(false)}>
            <ShoppingBag size={19} />
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}