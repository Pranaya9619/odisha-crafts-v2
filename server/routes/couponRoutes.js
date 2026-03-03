const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

router.post("/validate", async (req, res) => {
  const { code } = req.body;

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    active: true,
  });

  if (!coupon) {
    return res.status(400).json({ message: "Invalid coupon" });
  }

  res.json(coupon);
});

module.exports = router;