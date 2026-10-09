import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag, Star, ArrowLeft } from "lucide-react";
import { useStore } from "../context/StoreContext";
import Loader from "../assets/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const { addToCart, wishlist, toggleWishlist } = useStore();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setProduct(data); setStatus("success"); })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <section className="section"><div className="container"><Loader text="Loading product..." /></div></section>;
  if (status === "error" || !product) return <section className="section"><div className="container"><div className="state-box"><h2>Product not found</h2><p>We couldn't load this product.</p><Link className="btn primary" to="/products">Back to shop</Link></div></div></section>;

  const wished = wishlist.some((item) => item.id === product.id);

  return (
    <section className="section">
      <div className="container">
        <Link to="/products" className="back-link"><ArrowLeft size={16} /> Back to shop</Link>
        <div className="detail">
          <div className="detail-image"><img src={product.image} alt={product.title} /></div>
          <div className="detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.title}</h1>
            <div className="detail-rating"><Star size={18} fill="currentColor" /> {product.rating?.rate} <span>({product.rating?.count} reviews)</span></div>
            <div className="detail-price">₹{product.price.toFixed(2)}</div>
            <p className="detail-description">{product.description}</p>
            <div className="detail-actions">
              <button className="btn primary large" onClick={() => addToCart(product)}><ShoppingBag /> Add to cart</button>
              <button className={`btn outline large ${wished ? "selected" : ""}`} onClick={() => toggleWishlist(product)}><Heart fill={wished ? "currentColor" : "none"} /> {wished ? "Saved" : "Wishlist"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}