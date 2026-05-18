const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protectAdmin = async (
  req,
  res,
  next
) => {

  let token;

  if (
    req.headers.authorization?.startsWith(
      "Bearer"
    )
  ) {

    token =
      req.headers.authorization.split(
        " "
      )[1];

  }

  if (!token) {
    return res.status(401).json({
      message:
        "Not authorized, no token",
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ EXTRA ROLE CHECK
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message:
          "Admin access only",
      });
    }

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {
      return res.status(401).json({
        message:
          "User not found",
        });
    }

    // ✅ DB ROLE CHECK
    if (user.role !== "admin") {
      return res.status(403).json({
        message:
          "Admin access only",
      });
    }

    req.user = user;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Token invalid",
    });

  }
};