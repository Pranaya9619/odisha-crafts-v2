const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  sendOTP,
  verifyOTP,
  refreshToken,
  logout,
} = require("../controllers/authController");

const router = express.Router();
const jwt = require("jsonwebtoken");

/* ============================= */
/* NORMAL AUTH ROUTES */
/* ============================= */

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

/* ============================= */
/* GOOGLE OAUTH ROUTES */
/* ============================= */

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/google/failure",
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      message: "Google login successful",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
      accessToken: token,
    });
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

module.exports = router;