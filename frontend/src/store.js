import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? localStorage.getItem("cartItems")
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const store = configureStore({
  reducer,
  initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
