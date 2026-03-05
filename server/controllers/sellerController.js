const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/* ================= REGISTER ================= */

exports.registerSeller = async (req, res) => {
  try {
    const { name, email, password, phone, district } = req.body;

    const exists = await Seller.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const seller = await Seller.create({
      name,
      email,
      password,
      phone,
      district,
    });

    const token = jwt.sign(
      {
        id: seller._id,
        role: "seller"
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      seller,
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= LOGIN ================= */

exports.loginSeller = async (req, res) => {
  try {

    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: seller._id,
        role: "seller"
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      seller,
      token
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= LOGOUT ================= */

exports.logoutSeller = (req, res) => {

  res.clearCookie("sellerToken");

  res.json({
    message: "Seller logged out",
  });

};


/* ================= GET SELLER PROFILE ================= */

exports.getSellerProfile = async (req, res) => {
  try {

    if (!req.seller) {
      return res.status(401).json({ message: "Seller not authenticated" });
    }

    const seller = await Seller.findById(req.seller._id).select("-password");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(seller);

  } catch (err) {

    console.error("GET PROFILE ERROR:", err);

    res.status(500).json({
      message: err.message
    });

  }
};


/* ================= UPDATE SELLER PROFILE ================= */

exports.updateSellerProfile = async (req, res) => {
  try {

    if (!req.seller) {
      return res.status(401).json({ message: "Seller not authenticated" });
    }

    const seller = await Seller.findById(req.seller._id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const { name, phone, district } = req.body;

    seller.name = name || seller.name;
    seller.phone = phone || seller.phone;
    seller.district = district || seller.district;

    const updatedSeller = await seller.save();

    res.json({
      message: "Profile updated successfully",
      seller: updatedSeller
    });

  } catch (err) {

    console.error("PROFILE UPDATE ERROR:", err);

    res.status(500).json({
      message: err.message
    });

  }
};

exports.changeSellerPassword = async (req, res) => {
  try {

    const seller = await Seller.findById(req.seller._id);

    const { currentPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(currentPassword, seller.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    seller.password = newPassword; // let schema hash it
    await seller.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};