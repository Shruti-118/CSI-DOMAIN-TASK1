import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="section"><div className="container"><div className="state-box"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page you requested doesn't exist.</p><Link className="btn primary" to="/">Go home</Link></div></div></section>;
}