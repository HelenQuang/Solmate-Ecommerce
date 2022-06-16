import express from "express";

import {
  getProducts,
  getProductById,
  getProductsByCategory,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router
  .route("/id/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct);
router.route("/category/:category").get(getProductsByCategory);

export default router;
