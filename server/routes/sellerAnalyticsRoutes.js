const express = require("express");
const router = express.Router();

const { protectSeller } = require("../middleware/protectSeller");

const {
  getSellerAnalytics,
} = require("../controllers/sellerAnalyticsController");

router.get("/", protectSeller, getSellerAnalytics);

module.exports = router;