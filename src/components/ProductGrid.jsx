import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="grid" role="list">
      {products.map((p) => (
        <div key={p.id} role="listitem">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
