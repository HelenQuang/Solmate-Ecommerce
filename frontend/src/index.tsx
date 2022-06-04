import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LogInPage from "./pages/LogInPage";
import WishlistPage from "./pages/WishlistPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shop/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
