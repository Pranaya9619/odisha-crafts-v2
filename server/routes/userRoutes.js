const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  sendEmailOTP,
  verifyEmailOTP,
  sendPhoneOTP,
  verifyPhoneOTP,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

/* ================= PROFILE ================= */

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

/* ================= EMAIL VERIFICATION ================= */

router.post("/verify-email/send-otp", protect, sendEmailOTP);
router.post("/verify-email/confirm", protect, verifyEmailOTP);

/* ================= PHONE VERIFICATION ================= */

router.post("/verify-phone/send-otp", protect, sendPhoneOTP);
router.post("/verify-phone/confirm", protect, verifyPhoneOTP);

/* ================= ADDRESS MANAGEMENT ================= */

router.post("/address", protect, addAddress);
router.put("/address/:id", protect, updateAddress);
router.delete("/address/:id", protect, deleteAddress);

module.exports = router;