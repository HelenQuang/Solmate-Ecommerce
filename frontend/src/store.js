import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer } from "./reducers/userReducer";

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
};

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
