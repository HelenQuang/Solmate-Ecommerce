import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
  productCategoryReducer,
} from "./reducers/productReducer";

const reducer = {
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCategory: productCategoryReducer,
};

const initialState = {};

const store = configureStore({
  reducer,
  initialState,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
