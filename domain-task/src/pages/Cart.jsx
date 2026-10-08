import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import EmptyState from "../assets/EmptyState";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 7.99;
  const total = subtotal + shipping;

  if (!cart.length) return <section className="section"><div className="container"><EmptyState title="Your cart is empty" message="Add something you love and it will appear here." /></div></section>;

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading"><p className="eyebrow">YOUR BAG</p><h1>Shopping cart</h1></div>
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map(item => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <Link to={`/products/${item.id}`}><h3>{item.title}</h3></Link>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={15} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={15} /></button>
                  </div>
                </div>
                <div className="cart-line-total">₹{(item.price * item.quantity).toFixed(2)}</div>
                <button className="icon-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove"><Trash2 size={18} /></button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>Order summary</h2>
            <div><span>Subtotal</span><b>₹{subtotal.toFixed(2)}</b></div>
            <div><span>Shipping</span><b>{shipping ? `${shipping.toFixed(2)}` : "Free"}</b></div>
            <hr />
            <div className="summary-total"><span>Total</span><b>₹{total.toFixed(2)}</b></div>
            <button className="btn primary full" onClick={() => navigate("/checkout")}>Proceed to checkout</button>
          </aside>
        </div>
      </div>
    </section>
      );
}