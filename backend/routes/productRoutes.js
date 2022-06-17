import express from "express";

import {
  getProducts,
  getProductById,
  getProductsByCategory,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/id/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route("/category/:category").get(getProductsByCategory);
router.route("/id/:id/reviews").post(protect, createProductReview);

export default router;
