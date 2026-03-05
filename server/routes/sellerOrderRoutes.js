const express = require("express");
const router = express.Router();

const { protectSeller } = require("../middleware/protectSeller");

const {
  getSellerOrders,
  updateOrderStatus,
} = require("../controllers/sellerOrderController");


router.get("/", protectSeller, getSellerOrders);

router.put("/:id/status", protectSeller, updateOrderStatus);


module.exports = router;