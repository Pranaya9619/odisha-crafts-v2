const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
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

// Protected create product
router.post("/", protect, productController.createProduct);

// Protected add review
router.post("/:id/reviews", protect, productController.addReview);

module.exports = router;