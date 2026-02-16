import React, { useEffect, useMemo, useState } from "react";
import { CART_KEY } from "./cart.constants";
import { CartContext } from "./Cart.context";

export function CartProvider({ children }) {
  const [count, setCount] = useState(() => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? Number(raw) : 0;
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, String(count));
  }, [count]);

  const value = useMemo(() => ({ count, setCount }), [count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
