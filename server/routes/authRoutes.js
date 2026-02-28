const express = require("express");
const passport = require("passport");

const {
  register,
  login,
  sendOTP,
  verifyOTP,
  refreshToken,
  logout,
  getMe,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const jwt = require("jsonwebtoken");

/* ============================= */
/* NORMAL AUTH ROUTES */
/* ============================= */

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/refresh", refreshToken);
router.get("/me", protect, getMe);

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
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const generateAccessToken = (id) =>
      jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

    const generateRefreshToken = (id) =>
      jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

    const accessToken = generateAccessToken(req.user._id);
    const refreshToken = generateRefreshToken(req.user._id);

    // Set refresh cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
    });

    const safeUser = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    // Redirect to frontend
    res.redirect(
      `http://localhost:5173/oauth-success?accessToken=${accessToken}&user=${encodeURIComponent(
        JSON.stringify(safeUser)
      )}`
    );
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

module.exports = router;