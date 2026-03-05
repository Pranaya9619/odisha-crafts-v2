const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { protectSeller } = require("../middleware/sellerAuthMiddleware");

/* Public shop routes */
router.get("/", productController.getAllProducts);

/* Seller dashboard routes */
router.get("/my", protectSeller, productController.getMyProducts);

/* Public product page */
router.get("/:id", productController.getProductById);

/* Seller product management */
router.post("/", protectSeller, productController.createProduct);
router.put("/:id", protectSeller, productController.updateProduct);
router.delete("/:id", protectSeller, productController.deleteProduct);

/* Reviews (buyers) */
router.post("/:id/reviews", protect, productController.addReview);
router.put("/:id/reviews/:reviewId", protect, productController.updateReview);
router.delete("/:id/reviews/:reviewId", protect, productController.deleteReview);

module.exports = router;