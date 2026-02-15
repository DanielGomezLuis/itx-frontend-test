import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const { id } = useParams();

  const isHome = location.pathname === "/";
  return (
    <nav className="breadcrumbs" aria-label="breadcrumbs">
      <Link to="/">Home</Link>
      {!isHome && (
        <>
          <span className="sep">/</span>
          <span>Product {id}</span>
        </>
      )}
    </nav>
  );
}
