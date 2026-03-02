const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

exports.protectSeller = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const seller = await Seller.findById(decoded.id).select("-password");

    if (!seller) {
      return res.status(401).json({ message: "Seller not found" });
    }

    req.seller = seller;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};