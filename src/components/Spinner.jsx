import React from "react";

export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="spinnerWrap" role="status" aria-live="polite">
      <div className="spinner" />
      <div className="muted">{label}</div>
    </div>
  );
}
