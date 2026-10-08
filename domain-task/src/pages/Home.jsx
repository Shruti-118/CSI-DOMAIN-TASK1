import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import ProductGrid from "../assets/ProductGrid";
import Loader from "../assets/Loader";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then((r) => {
          if (!r.ok) throw new Error("Failed to load products");
          return r.json();
        })
        .then((data) => {
  const updatedProducts = data.map((product) => ({
    ...product,
    price: product.price * 25,
  }));

  setProducts(updatedProducts);
  setStatus("success");
})
        .catch(() => setStatus("error"));
    }, []);
    return (
      <>
        <section className="hero">
            <div className="container hero-inner">
            <div>
                <p className="hero-kicker">NEW SEASON · NEW ENERGY</p>
                <h1>Everything you want.<br /><em>Nothing you don't.</em></h1>
                <p className="hero-copy">Discover everyday essentials, statement pieces and tech favorites in one clean shopping experience.</p>
                <Link className="btn primary large" to="/products">Shop collection <ArrowRight size={18} /></Link>
            </div>
            <div className="hero-art"><span>SHOP</span><span>SMART</span><span>LIVE</span></div>
            </div>
        </section>
        <section className="benefits">
        <div className="container benefit-grid">
          <div><Truck /><div><b>Fast delivery</b><small>On eligible orders</small></div></div>
          <div><ShieldCheck /><div><b>Secure checkout</b><small>Safe simulated payment</small></div></div>
          <div><RotateCcw /><div><b>Easy returns</b><small>30-day demo policy</small></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">CURATED FOR YOU</p><h2>Featured products</h2></div>
            <Link to="/products" className="text-link">View all <ArrowRight size={16} /></Link>
          </div>
          {status === "loading" && <Loader />}
          {status === "error" && <div className="alert error">Products couldn't be loaded right now. Try the Shop page again.</div>}
          {status === "success" && <ProductGrid products={products.slice(0, 8)} />}
        </div>
      </section>

      <section className="category-banner">
        <div className="container category-inner">
          <div>
            <p className="eyebrow">ONE STORE, MANY MOODS</p>
            <h2>Find your next favorite.</h2>
          </div>
          <Link className="btn light" to="/products">Explore categories <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}