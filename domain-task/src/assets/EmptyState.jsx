import { Link } from "react-router-dom";

export default function EmptyState({ title, message, action = "Continue shopping", to = "/products" }) {
  return (
    <div className="state-box empty">
      <h2>{title}</h2>
      <p>{message}</p>
      <Link className="btn primary" to={to}>{action}</Link>
    </div>
  );
}