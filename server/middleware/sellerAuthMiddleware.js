const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

exports.protectSeller = async (req, res, next) => {

  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Seller not authenticated"
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.seller = await Seller.findById(decoded.id).select("-password");

    if (!req.seller) {
      return res.status(401).json({
        message: "Seller account not found"
      });
    }

    next();

  } catch (err) {

    console.log("SELLER JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Seller token invalid or expired"
    });

  }
};