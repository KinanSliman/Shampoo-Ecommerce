import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar";
import "./scss/style.css";
import App from "./App.jsx";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <Navbar />
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CartProvider>
  </React.StrictMode>
);
