import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="card"
      aria-label={`Open ${product.brand} ${product.model}`}
    >
      <div className="thumbWrap">
        <img
          className="thumb"
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          loading="lazy"
        />
      </div>
      <div className="cardBody">
        <div className="muted">{product.brand}</div>
        <div className="title">{product.model}</div>
        <div className="price">{product.price} €</div>
      </div>
    </Link>
  );
}
