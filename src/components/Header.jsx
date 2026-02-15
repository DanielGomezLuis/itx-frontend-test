import React from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { useCart } from "../context/useCart";

export default function Header() {
  const { count } = useCart();
  const location = useLocation();

  return (
    <header className="header">
      <div className="headerRow">
        <Link to="/" className="brand" aria-label="Go to product list">
          <span className="brandDot" />
          <span>Mobile Shop</span>
        </Link>

        <div className="cartBadge" aria-label="Cart items count">
          Cart: <strong>{count}</strong>
        </div>
      </div>

      <div className="headerRow">
        <Breadcrumbs key={location.pathname} />
      </div>
    </header>
  );
}
