const express = require("express");
const router = express.Router();

const { protectSeller } = require("../middleware/protectSeller");

const {
  getSellerAnalytics
} = require("../controllers/sellerAnalyticsController");

const {
  getRevenueChart
} = require("../controllers/sellerDashboardController");

const {
  registerSeller,
  loginSeller,
  logoutSeller,
  getSellerProfile,
  updateSellerProfile,
} = require("../controllers/sellerController");
const { changeSellerPassword } = require("../controllers/sellerController");

/* ================= AUTH ================= */

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);


/* ================= CURRENT SELLER ================= */

router.get("/me", protectSeller, (req, res) => {
  res.json(req.seller);
});


/* ================= SELLER PROFILE ================= */

router.get("/profile", protectSeller, getSellerProfile);
router.put("/profile", protectSeller, updateSellerProfile);


/* ================= DASHBOARD ================= */

router.get("/analytics", protectSeller, getSellerAnalytics);
router.get("/revenue-chart", protectSeller, getRevenueChart);

router.put("/change-password", protectSeller, changeSellerPassword);

module.exports = router;