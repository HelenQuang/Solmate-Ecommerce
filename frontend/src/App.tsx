import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import ProductListPage from "./pages/ProductListPage";
import OrderListPage from "./pages/OrderListPage";

const App: React.FC = () => {
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    const getClientId = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      setClientID(clientId);
    };

    if (!window.paypal) {
      getClientId();
    }
  }, []);

  const initialOptions = {
    "client-id": clientID,
    currency: "EUR",
    intent: "capture",
  };

  return (
    <>
      {clientID && (
        <PayPalScriptProvider options={initialOptions}>
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
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/admin/userlist" element={<UserListPage />} />
              <Route path="/admin/productlist" element={<ProductListPage />} />
              <Route path="/admin/orderlist" element={<OrderListPage />} />
            </Routes>
          </main>
          <Footer />
        </PayPalScriptProvider>
      )}
    </>
  );
};

export default App;
