const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getCurrentOrders,
  getPastOrders,
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

/* ================= USER ROUTES ================= */

// Create order
router.post("/", protect, createOrder);

// Get all user orders
router.get("/my-orders", protect, getMyOrders);

// Get current active orders
router.get("/my-orders/current", protect, getCurrentOrders);

// Get past completed/cancelled orders
router.get("/my-orders/past", protect, getPastOrders);

/* ================= ADMIN ROUTES ================= */

// Get all orders
router.get("/", protect, isAdmin, getAllOrders);

// Update order status
router.put("/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;