const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

exports.protectSeller = async (
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
        "Seller not authenticated",
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // ✅ ROLE VALIDATION
    if (
      decoded.role !== "seller"
    ) {

      return res.status(403).json({
        message:
          "Seller access only",
      });

    }

    const seller =
      await Seller.findById(
        decoded.id
      ).select("-password");

    if (!seller) {
      return res.status(401).json({
        message:
          "Seller account not found",
      });
    }

    // ✅ BLOCK ARCHIVED SELLERS
    if (
      seller.isArchived ||
      seller.status ===
        "archived"
    ) {

      return res.status(403).json({
        message:
          "Your account has been archived. Contact admin.",
      });

    }

    // Attach seller
    req.seller = seller;

    /* ONBOARDING FLAGS */

    req.sellerFlags = {
      onboardingCompleted:
        seller.onboardingCompleted,

      onboardingStep:
        seller.onboardingStep,

      status: seller.status,

      isApproved:
        seller.status ===
        "approved",
    };

    next();

  } catch (err) {

    console.log(
      "SELLER JWT ERROR:",
      err.message
    );

    return res.status(401).json({
      message:
        "Seller token invalid or expired",
    });

  }
};