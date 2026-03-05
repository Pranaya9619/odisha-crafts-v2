const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (err) {

    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Token invalid or expired" });

  }
};
exports.isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

exports.isSeller = (req, res, next) => {

  if (req.user?.role === "seller") {
    return next();
  }

  return res.status(403).json({
    message: "Seller access only"
  });

};