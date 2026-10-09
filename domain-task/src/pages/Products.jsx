import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import ProductGrid from "../assets/ProductGrid";
import Loader from "../assets/Loader";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(10000);

  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
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

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category) &&
      p.price <= maxPrice
    );
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    return result;
  }, [products, search, category, maxPrice, sort]);

  const clear = () => {
    setCategory("all"); setSort("featured"); setMaxPrice(10000);
    setSearchParams({});
  };

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <div><p className="eyebrow">THE CATALOG</p><h1>Shop all products</h1><p>{filtered.length} products</p></div>
        </div>

        <div className="filters">
          <label><span>Search</span><input value={search} onChange={(e) => setSearchParams(e.target.value ? { search: e.target.value } : {})} placeholder="Search..." /></label>
          <label><span>Category</span><select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map(c => <option key={c} value={c}>{c === "all" ? "All categories" : c}</option>)}</select></label>
          <label><span>Max price: ₹{maxPrice}</span><input type="range" min="10" max="1000" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></label>
          <label><span>Sort</span><select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option>
          </select></label>
          <button className="btn outline" onClick={clear}><SlidersHorizontal size={16} /> Reset</button>
        </div>

        {status === "loading" && <Loader text="Loading catalog..." />}
        {status === "error" && <div className="alert error">The product API is unavailable. Please check your connection and retry.</div>}
        {status === "success" && filtered.length > 0 && <ProductGrid products={filtered} />}
        {status === "success" && filtered.length === 0 && <div className="state-box empty"><h2>No products found</h2><p>Try a different search, category or price.</p><button className="btn primary" onClick={clear}>Clear filters</button></div>}
      </div>
    </section>
  );
}