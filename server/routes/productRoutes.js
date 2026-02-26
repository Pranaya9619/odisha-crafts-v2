const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", productController.getAllProducts);

// Protected route
router.post("/", protect, productController.createProduct);

module.exports = router;