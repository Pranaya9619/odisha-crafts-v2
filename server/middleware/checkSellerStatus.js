exports.checkSellerApproved = (
  req,
  res,
  next
) => {

  const seller = req.seller;

  // Safety check
  if (!seller) {
    return res.status(401).json({
      message:
        "Seller not authenticated",
    });
  }

  // Not approved yet
  if (
    seller.status !== "approved"
  ) {

    let message =
      "Access denied. Approval required.";

    // ✅ ONBOARDING
    if (
      seller.status ===
      "onboarding"
    ) {

      message =
        "Please complete onboarding to continue.";

    }

    // ✅ WAITING FOR ADMIN
    if (
      seller.status ===
      "approval_pending"
    ) {

      message =
        "Your account is under review. Please wait for admin approval.";

    }

    // ✅ REJECTED
    if (
      seller.status ===
      "rejected"
    ) {

      message =
        "Your request was rejected. Contact admin for more details.";

    }

    // ✅ ARCHIVED
    if (
      seller.status ===
      "archived"
    ) {

      message =
        "Your account has been archived. Contact admin.";

    }

    return res.status(403).json({
      message,
    });

  }

  // Approved → proceed
  next();

};