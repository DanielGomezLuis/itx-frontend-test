import { getCache, setCache } from "./cache";
import { normalizeProductListItem, normalizeProductDetail } from "./mappers";

const API_BASE = "https://itx-frontend-test.onrender.com";

async function http(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }

  return res.json();
}

export async function getProducts() {
  const key = "cache:/api/product";
  const cached = getCache(key);
  if (cached) return cached;

  const data = await http("/api/product");

  const normalized = Array.isArray(data)
    ? data.map(normalizeProductListItem)
    : [];

  setCache(key, normalized);
  return normalized;
}

export async function getProductById(id) {
  const key = `cache:/api/product/${id}`;
  const cached = getCache(key);
  if (cached) return cached;

  const data = await http(`/api/product/${id}`);

  const normalized = normalizeProductDetail(data);

  setCache(key, normalized);
  return normalized;
}

export async function addToCart({ id, colorCode, storageCode }) {
  return http("/api/cart", {
    method: "POST",
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
}
