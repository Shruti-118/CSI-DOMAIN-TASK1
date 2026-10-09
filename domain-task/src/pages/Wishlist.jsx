import { useStore } from "../context/StoreContext";
import { ShoppingBag, Trash2 } from "lucide-react";
import EmptyState from "../assets/EmptyState";

export default function Wishlist() {
  const { wishlist, toggleWishlist, moveToCart } = useStore();

  if (!wishlist.length) return <section className="section"><div className="container"><EmptyState title="Your wishlist is empty" message="Save products here so you can come back to them later." /></div></section>;

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading"><p className="eyebrow">SAVED FOR LATER</p><h1>Wishlist</h1></div>
        <div className="wishlist-grid">
          {wishlist.map(product => (
            <article className="wishlist-item" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <strong>₹{product.price.toFixed(2)}</strong>
                <div className="row-actions">
                  <button className="btn primary small" onClick={() => moveToCart(product)}><ShoppingBag size={15} /> Move to cart</button>
                  <button className="icon-btn" onClick={() => toggleWishlist(product)}><Trash2 size={17} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}