import express from "express";

import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/id/:id").get(getProductById);
router.route("/category/:category").get(getProductsByCategory);

export default router;
