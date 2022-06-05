import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LogInPage from "./pages/LogInPage";
import WishlistPage from "./pages/WishlistPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route
              path="/shop/:category/product/:id"
              element={<ProductPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
