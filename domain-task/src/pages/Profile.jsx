import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function Profile() {
  const { user, login, logout, orders } = useStore();
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a name and valid email.");
      return;
    }
    login(form.name.trim(), form.email.trim());
  };

  if (user.loggedIn) {
    return (
      <section className="section"><div className="container narrow">
        <div className="profile-card">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <p className="eyebrow">ACCOUNT</p><h1>{user.name}</h1><p>{user.email}</p>
          <div className="profile-stats"><div><b>{orders.length}</b><span>Orders</span></div><div><b>Demo</b><span>Account type</span></div></div>
          <button className="btn outline" onClick={logout}>Log out</button>
        </div>
      </div></section>
    );
  }

  return (
    <section className="section"><div className="container narrow">
      <div className="profile-card">
        <p className="eyebrow">WELCOME BACK</p><h1>Sign in</h1><p>Demo login — no password is required.</p>
        <form onSubmit={submit} className="login-form">
          <label><span>Name</span><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></label>
          <label><span>Email</span><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></label>
          {error && <div className="field-error">{error}</div>}
          <button className="btn primary full">Continue</button>
        </form>
      </div>
    </div></section>
  );
}