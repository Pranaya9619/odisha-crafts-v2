const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

const Seller = require("../models/Seller");
const Product = require("../models/Product");

/* ================= VENDORS ================= */

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {

    const vendors = await Seller.find()

      .select(
        "-password -otp -resetPasswordToken -resetPasswordExpires"
      )

      .sort({ createdAt: -1 });

    res.json(vendors);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


// Approve vendor
exports.approveVendor = async (req, res) => {
  try {

    const vendor = await Seller.findById(
      req.params.id
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    vendor.status = "approved";

    vendor.isArchived = false;

    vendor.onboardingCompleted = true;

    await vendor.save();

    res.json({
      message: "Vendor approved successfully",
      vendor,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


// Reject vendor
exports.rejectVendor = async (req, res) => {
  try {

    const vendor = await Seller.findById(
      req.params.id
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    // ✅ ACTUAL REJECTION
    vendor.status = "rejected";

    vendor.onboardingCompleted = true;

    await vendor.save();

    res.json({
      message: "Vendor rejected",
      vendor,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


// Archive vendor (soft delete)
exports.archiveVendor = async (req, res) => {
  try {

    const vendor = await Seller.findById(
      req.params.id
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    // ✅ ACTUAL ARCHIVE
    vendor.status = "archived";

    vendor.isArchived = true;

    vendor.onboardingCompleted = true;

    await vendor.save();

    res.json({
      message: "Vendor archived",
      vendor,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


/* ================= RESTORE VENDOR ================= */

exports.restoreVendor = async (req, res) => {
  try {

    const vendor = await Seller.findById(
      req.params.id
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    vendor.status = "approved";

    vendor.isArchived = false;

    vendor.onboardingCompleted = true;

    await vendor.save();

    res.json({
      message: "Vendor restored",
      vendor,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


/* ================= PRODUCTS ================= */

// Get all products (admin view)
exports.getAllProductsAdmin = async (req, res) => {
  try {

    const products = await Product.find()

      .populate("seller", "name email")

      .sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


// Archive product
exports.archiveProduct = async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isArchived = true;

    await product.save();

    res.json({
      message:
        "Product archived successfully",
      product,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


exports.getAdminStats = async (req, res) => {
  try {

    const totalVendors =
      await Seller.countDocuments();

    const pendingVendors =
      await Seller.countDocuments({
        status: "approval_pending",
      });

    const approvedVendors =
      await Seller.countDocuments({
        status: "approved",
      });

    const archivedVendors =
      await Seller.countDocuments({
        status: "archived",
      });

    const totalProducts =
      await Product.countDocuments({
        isArchived: { $ne: true },
      });

    const archivedProducts =
      await Product.countDocuments({
        isArchived: true,
      });

    const onboardingVendors =
      await Seller.countDocuments({
        status: "onboarding",
      });

    const approvalPendingVendors =
      await Seller.countDocuments({
        status: "approval_pending",
      });

    res.json({
      totalVendors,
      pendingVendors,
      approvedVendors,
      archivedVendors,
      totalProducts,
      archivedProducts,
      onboardingVendors,
      approvalPendingVendors,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


exports.unarchiveProduct = async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isArchived = false;

    await product.save();

    res.json({
      message: "Product restored",
      product,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

exports.adminLogin =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const admin =
        await User.findOne({
          email,
          role: "admin",
        }).select("+password");

      if (!admin) {

        return res.status(401).json({
          message:
            "Admin not found",
        });

      }

      const isMatch =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (!isMatch) {

        return res.status(401).json({
          message:
            "Invalid credentials",
        });

      }

      const token =
        jwt.sign(
          {
            id: admin._id,
            role:
              admin.role,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

      res.json({
        token,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Server error",
      });

    }
  };