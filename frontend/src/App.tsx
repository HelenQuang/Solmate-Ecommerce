import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LogInPage from "./pages/LogInPage";
import WishlistPage from "./pages/WishlistPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products/category/:category"
            element={<CategoryPage />}
          />
          <Route path="/products/id/:id" element={<ProductPage />} />
          <Route
            path="/products/category/:category/products/id/:id"
            element={<ProductPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
