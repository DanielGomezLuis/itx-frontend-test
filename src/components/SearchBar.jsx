import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by brand or model..."
        aria-label="Search products"
      />
    </div>
  );
}
