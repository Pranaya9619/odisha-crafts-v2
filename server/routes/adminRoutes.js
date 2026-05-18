const express = require("express");
const router = express.Router();
const { unarchiveProduct } = require("../controllers/adminController");
const {
  getAllVendors,
  approveVendor,
  rejectVendor,
  archiveVendor,
  restoreVendor,
  getAllProductsAdmin,
  archiveProduct,
  getAdminStats,
  adminLogin
} = require("../controllers/adminController");

// 🔥 REAL admin protection
const { protectAdmin } = require("../middleware/adminMiddleware");

/* ================= VENDORS ================= */

// Get all vendors
router.get("/vendors", protectAdmin, getAllVendors);

// Approve vendor
router.put("/vendors/:id/approve", protectAdmin, approveVendor);

// Reject vendor
router.put("/vendors/:id/reject", protectAdmin, rejectVendor);

// Archive vendor
router.put("/vendors/:id/archive", protectAdmin, archiveVendor);

// Restore vendor
router.put(
  "/vendors/:id/restore",
  protectAdmin,
  restoreVendor
);

/* ================= PRODUCTS ================= */

// Get all products
router.get("/products", protectAdmin, getAllProductsAdmin);

// Archive product
router.put("/products/:id/archive", protectAdmin, archiveProduct);
router.put("/products/:id/unarchive", protectAdmin, unarchiveProduct);

/* ================= STATS ================= */

// Dashboard stats
router.get("/stats", protectAdmin, getAdminStats);
router.post(
  "/login",
  adminLogin
);

module.exports = router;

