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
  sendForgotPasswordOTP,
  resetPasswordWithOTP,
  setDefaultAddress,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const { changePassword, setPassword } = require("../controllers/userController");

/* ================= PROFILE ================= */

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.post("/set-password", protect, setPassword);

/* ================= FORGOT PASSWORD ================= */

router.post(
  "/forgot-password/send-otp",
  sendForgotPasswordOTP
);

router.put(
  "/forgot-password/reset",
  resetPasswordWithOTP
);
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
router.put(
  "/address/:id/default",
  protect,
  setDefaultAddress
);

module.exports = router;