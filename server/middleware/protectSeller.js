const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

exports.protectSeller = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No seller token provided" });
  }

  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const seller = await Seller.findById(decoded.id);

    if (!seller) {
      return res.status(401).json({ message: "Seller not found" });
    }

    req.seller = seller;

    next();

  } catch (err) {

    console.error("JWT ERROR:", err.message);

    return res.status(401).json({ message: "Invalid seller token" });
  }

};