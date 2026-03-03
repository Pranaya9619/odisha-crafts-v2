const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User exists" });
    }

    // 🔥 Create unverified user
    const user = await User.create({
      name,
      email,
      password,
      isEmailVerified: false,
    });

    // 🔥 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailOTP = otp;
    user.emailOTPExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    sendEmail({
      to: email,
      subject: "Verify your email",
      html: `<p>Your OTP is <b>${otp}</b></p>`,
    }).catch((err) => {
      console.error("Email failed:", err);
    });

    res.status(201).json({
      message: "OTP_SENT",
      email: user.email,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password +googleId");

    // 1️⃣ If user does not exist
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        message: "EMAIL_NOT_VERIFIED",
      });
    }

    // 2️⃣ If user registered using Google
    if (user.googleId && !user.password) {
      return res.status(400).json({
        message: "GOOGLE_LOGIN_REQUIRED",
      });
    }

    // 3️⃣ Normal password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (
      user.emailOTP !== otp ||
      user.emailOTPExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔥 Mark verified
    user.isEmailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpires = undefined;

    await user.save();

    // 🔥 Now login
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.json({
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = generateAccessToken(decoded.id);

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password -otp -otpExpires");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};