const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/* ================= REGISTER ================= */

exports.registerSeller = async (req, res) => {
  try {
    const { name, email, password, phone, district, craft } = req.body;

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
      craft,
    });

    const token = jwt.sign(
      { id: seller._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      seller,
      accessToken: token,
    });
  } catch (err) {
    //console.error("SELLER REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
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
      { id: seller._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      seller,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller._id);

    if (!seller)
      return res.status(404).json({ message: "Seller not found" });

    seller.quote = req.body.quote ?? seller.quote;

    const updated = await seller.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};