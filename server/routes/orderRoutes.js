const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  verifyPayment,
  getMyOrders,
  getCurrentOrders,
  getPastOrders,
} = require("../controllers/orderController");

router.post("/create", protect, createOrder);
router.post("/verify", protect, verifyPayment);

router.get("/my-orders", protect, getMyOrders);
router.get("/my-orders/current", protect, getCurrentOrders);
router.get("/my-orders/past", protect, getPastOrders);

module.exports = router;