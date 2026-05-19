const express = require("express");

const router = express.Router();

const passport = require("passport");

const jwt = require("jsonwebtoken");

const {
  protectSeller,
} = require(
  "../middleware/sellerAuthMiddleware"
);

const {
  getSellerAnalytics,
} = require(
  "../controllers/sellerAnalyticsController"
);

const {
  getRevenueChart,
} = require(
  "../controllers/sellerDashboardController"
);

const {
  registerSeller,
  verifySellerOTP,
  loginSeller,
  logoutSeller,
  getSellerProfile,
  updateSellerProfile,
  changeSellerPassword,
  saveOnboardingStep,
} = require(
  "../controllers/sellerController"
);

const {
  forgotPassword,
  resetPassword,
} = require(
  "../controllers/sellerController"
);


/* ================= AUTH ================= */

router.post(
  "/register",
  registerSeller
);

router.post(
  "/verify-otp",
  verifySellerOTP
);

router.post(
  "/login",
  loginSeller
);

router.post(
  "/logout",
  logoutSeller
);

router.post(
  "/forgot-password/send-otp",
  forgotPassword
);

router.put(
  "/forgot-password/reset",
  resetPassword
);

/* ================= GOOGLE AUTH ================= */

router.get(
  "/google",

  passport.authenticate(
    "seller-google",
    {
      scope: [
        "profile",
        "email",
      ],
    }
  )
);


router.get(
  "/google/callback",

  passport.authenticate(
    "seller-google",
    {
      session: false,

      // ✅ FIXED
      failureRedirect:
        `${process.env.CLIENT_URL}/seller/login`,
    }
  ),

  (req, res) => {

    const token = jwt.sign(
      {
        id: req.user._id,
        role: "seller",
      },

      process.env
        .ACCESS_TOKEN_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.redirect(
      `${process.env.CLIENT_URL}/seller/oauth-success?token=${token}`
    );

  }
);



/* ================= CURRENT SELLER ================= */

router.get(
  "/me",
  protectSeller,
  (req, res) => {
    res.json(req.seller);
  }
);


/* ================= SELLER PROFILE ================= */

router.get(
  "/profile",
  protectSeller,
  getSellerProfile
);

router.put(
  "/profile",
  protectSeller,
  updateSellerProfile
);


/* ================= DASHBOARD ================= */

router.get(
  "/analytics",
  protectSeller,
  getSellerAnalytics
);

router.get(
  "/revenue-chart",
  protectSeller,
  getRevenueChart
);

router.put(
  "/change-password",
  protectSeller,
  changeSellerPassword
);


/* ================= ONBOARDING ================= */

router.post(
  "/onboarding",
  protectSeller,
  saveOnboardingStep
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);


module.exports = router;