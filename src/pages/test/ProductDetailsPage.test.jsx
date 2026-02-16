import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetailsPage from "../ProductDetailsPage";
import * as api from "../../api/client";
import { CartProvider } from "../../context/CartContext";

vi.mock("../../api/client");

describe("ProductDetailsPage - Add to Cart", () => {
  it("calls API and updates cart count", async () => {
    api.getProductById.mockResolvedValue({
      id: "1",
      brand: "Acer",
      model: "Test Phone",
      price: 100,
      imgUrl: "x",
      cpu: "",
      ram: "",
      os: "",
      displayResolution: "",
      displaySize: "",
      battery: "",
      primaryCamera: [],
      secondaryCamera: "",
      dimensions: "",
      weight: "",
      options: {
        colors: [{ code: 1000, name: "Black" }],
        storages: [{ code: 2000, name: "8GB" }],
      },
    });

    api.addToCart.mockResolvedValue({ count: 5 });

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );

    const button = await screen.findByText("Add to cart");
    fireEvent.click(button);

    expect(api.addToCart).toHaveBeenCalled();
  });
});
