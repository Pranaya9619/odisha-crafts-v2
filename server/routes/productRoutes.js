const express = require("express");

const router = express.Router();

const productController = require(
  "../controllers/productController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  protectSeller,
} = require(
  "../middleware/sellerAuthMiddleware"
);

// Seller approval middleware
const {
  checkSellerApproved,
} = require(
  "../middleware/checkSellerStatus"
);


/* ================= PUBLIC SHOP ROUTES ================= */

router.get(
  "/",
  productController.getAllProducts
);


/* ================= SELLER DASHBOARD ================= */

router.get(
  "/my",
  protectSeller,
  productController.getMyProducts
);


/* ================= PUBLIC PRODUCT PAGE ================= */

router.get(
  "/:id",
  productController.getProductById
);


/* ================= SELLER PRODUCT MANAGEMENT ================= */

router.post(
  "/",
  protectSeller,
  checkSellerApproved,
  productController.createProduct
);

router.put(
  "/:id",
  protectSeller,
  checkSellerApproved,
  productController.updateProduct
);

router.delete(
  "/:id",
  protectSeller,
  checkSellerApproved,
  productController.deleteProduct
);


/* ================= PRODUCT REVIEWS ================= */

router.post(
  "/:id/reviews",
  protect,
  productController.addReview
);

router.put(
  "/:id/reviews/:reviewId",
  protect,
  productController.updateReview
);

router.delete(
  "/:id/reviews/:reviewId",
  protect,
  productController.deleteReview
);


module.exports = router;