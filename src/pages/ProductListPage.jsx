import React, { useEffect, useMemo, useState } from "react";
import { getProducts } from "../api/client";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import Spinner from "../components/Spinner";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");

    getProducts()
      .then((data) => {
        if (!alive) return;
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e.message || "Failed to load products");
      })
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return products;

    return products.filter((p) => {
      const brand = String(p.brand || "").toLowerCase();
      const model = String(p.model || "").toLowerCase();
      return brand.includes(term) || model.includes(term);
    });
  }, [products, q]);

  return (
    <section className="plp">
      <div className="plpTop">
        <h1 className="h1">Products</h1>
        <SearchBar value={q} onChange={setQ} />
      </div>

      {loading && <Spinner label="Loading products..." />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && <ProductGrid products={filtered} />}
    </section>
  );
}
