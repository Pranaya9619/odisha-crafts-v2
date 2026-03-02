const express = require("express");
const router = express.Router();

const {
  registerSeller,
  loginSeller,
  updateSellerProfile,
} = require("../controllers/sellerController");
const { protectSeller } = require("../middleware/protectSeller");

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.put("/profile", protectSeller, updateSellerProfile);
module.exports = router;