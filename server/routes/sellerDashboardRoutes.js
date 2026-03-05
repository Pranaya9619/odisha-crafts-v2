const express = require("express");
const router = express.Router();

const {
  getSellerDashboard,
  getRevenueChart
} = require("../controllers/sellerDashboardController");

const {
  protect,
  isSeller
} = require("../middleware/authMiddleware");


const { protectSeller } = require("../middleware/protectSeller");

router.get("/dashboard", protectSeller, getSellerDashboard);
router.get("/revenue-chart", protectSeller, getRevenueChart);

module.exports = router;