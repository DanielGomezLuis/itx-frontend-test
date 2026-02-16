import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToCart, getProductById } from "../api/client";
import Spinner from "../components/Spinner";
import { useCart } from "../context/useCart";

function pickDefaultOption(arr, key) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const first = arr[0];
  return first?.code ?? first?.[key] ?? null;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { setCount } = useCart();

  const [product, setProduct] = useState(null);
  const [colorCode, setColorCode] = useState(null);
  const [storageCode, setStorageCode] = useState(null);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");

    getProductById(id)
      .then((data) => {
        if (!alive) return;
        setProduct(data);
        setColorCode(pickDefaultOption(data?.options?.colors));
        setStorageCode(pickDefaultOption(data?.options?.storages));
      })
      .catch((e) => alive && setError(e.message || "Failed to load product"))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [id]);

  const colors = useMemo(() => product?.options?.colors ?? [], [product]);
  const storages = useMemo(() => product?.options?.storages ?? [], [product]);

  async function onAdd() {
    if (!product) return;
    setAdding(true);
    setError("");

    try {
      const payload = {
        id: product.id,
        colorCode: Number(colorCode),
        storageCode: Number(storageCode),
      };
      const res = await addToCart(payload);
      const serverCount = Number(res?.count);

      setCount((prev) => {
        if (!Number.isNaN(serverCount) && serverCount > prev)
          return serverCount;
        return prev + 1;
      });
    } catch (e) {
      setError(e.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <Spinner label="Loading product..." />;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <section className="pdp">
      <div className="pdpBack">
        <Link to="/" className="link">
          ← Back to products
        </Link>
      </div>

      <div className="pdpGrid">
        <div className="pdpLeft">
          <div className="imageBox">
            <img
              src={product.imgUrl}
              alt={`${product.brand} ${product.model}`}
            />
          </div>
        </div>

        <div className="pdpRight">
          <div className="panel">
            <h1 className="h1">
              {product.brand} {product.model}
            </h1>
            <div className="price big">{product.price} €</div>

            <ul className="specs">
              <li>
                <b>CPU:</b> {product.cpu}
              </li>
              <li>
                <b>RAM:</b> {product.ram}
              </li>
              <li>
                <b>OS:</b> {product.os}
              </li>
              <li>
                <b>Display:</b> {product.displayResolution}
              </li>
              <li>
                <b>Battery:</b> {product.battery}
              </li>
              <li>
                <b>Cameras:</b> {product.primaryCamera.join(", ")} /{" "}
                {product.secondaryCamera}
              </li>
              <li>
                <b>Dimensions:</b> {product.dimensions}
              </li>
              <li>
                <b>Weight:</b> {product.weight}
              </li>
            </ul>
          </div>

          <div className="panel">
            <h2 className="h2">Actions</h2>

            <div className="field">
              <label>Storage</label>
              <select
                value={storageCode ?? ""}
                onChange={(e) => setStorageCode(e.target.value)}
                disabled={storages.length === 0}
              >
                {storages.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name ?? s.capacity ?? `Storage ${s.code}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Color</label>
              <select
                value={colorCode ?? ""}
                onChange={(e) => setColorCode(e.target.value)}
                disabled={colors.length === 0}
              >
                {colors.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name ?? c.hex ?? `Color ${c.code}`}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn"
              onClick={onAdd}
              disabled={adding || colorCode == null || storageCode == null}
            >
              {adding ? "Adding..." : "Add to cart"}
            </button>

            {error && <div className="error mt">{error}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
