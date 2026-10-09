import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export default function Checkout() {
  const { cart, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user.name || "", email: user.email || "", phone: "",
    address: "", city: "", state: "", zip: ""
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!cart.length) return <section className="section"><div className="container"><div className="state-box"><h2>Nothing to checkout</h2><p>Your cart is empty.</p><Link className="btn primary" to="/products">Shop now</Link></div></div></section>;

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    ["name", "email", "phone", "address", "city", "state", "zip"].forEach(k => {
      if (!form[k].trim()) next[k] = "Required";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.zip && !/^[0-9]{4,10}$/.test(form.zip)) next.zip = "Enter a valid postal code";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder(form, cart);
      navigate(`/orders?success=${order.id}`);
    }, 800);
  };

  return (
    <section className="section">
      <div className="container narrow">
        <div className="page-heading"><p className="eyebrow">CHECKOUT</p><h1>Delivery details</h1></div>
        <form className="checkout-form" onSubmit={submit} noValidate>
          <div className="form-grid">
            {[
              ["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"],
              ["address", "Street address", "text"], ["city", "City", "text"], ["state", "State", "text"], ["zip", "Postal code", "text"]
            ].map(([name, label, type]) => (
              <label key={name} className={name === "address" ? "span-2" : ""}>
                <span>{label}</span>
                <input name={name} type={type} value={form[name]} onChange={update} aria-invalid={!!errors[name]} />
                {errors[name] && <small className="field-error">{errors[name]}</small>}
              </label>
            ))}
          </div>
          <div className="checkout-note"><b>Demo payment</b><p>No real payment is processed. Clicking place order creates a simulated order and stores it locally.</p></div>
          <div className="checkout-submit"><strong>Total: ₹{total.toFixed(2)}</strong><button disabled={placing} className="btn primary large">{placing ? "Placing..." : "Place simulated order"}</button></div>
        </form>
      </div>
    </section>
  );
}