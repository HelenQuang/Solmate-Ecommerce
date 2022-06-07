import express from "express";
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

const router = express.Router();

//@decs Fetch all products
//@route GET /api/products
//@access Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//@decs Fetch single product matches id
//@route GET /api/products/id/:id
//@access Public
router.get(
  "/id/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

//@decs Fetch all products match category
//@route GET /api/products/category/:category
//@access Public
router.get(
  "/category/:category",
  asyncHandler(async (req, res) => {
    const product = await Product.find({ category: req.params.category });

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("There is no product in this category");
    }
  })
);

export default router;
