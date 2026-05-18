const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const sellerSchema = new mongoose.Schema(
  {
    /* ================= AUTH ================= */

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      default: "",
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["seller", "admin"],
      default: "seller",
    },

    /* ================= OTP ================= */

    otp: {
      code: {
        type: String,
        default: "",
      },

      expiresAt: {
        type: Date,
      },
    },

    /* ================= RESET PASSWORD ================= */

    resetPasswordToken: {
      type: String,
      default: "",
    },

    resetPasswordExpires: {
      type: Date,
    },

    /* ================= PROFILE ================= */

    name: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    storeName: {
      type: String,
      default: "",
    },

    businessAddress: {
      type: String,
      default: "",
    },

    /* ================= ONBOARDING ================= */

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },

    onboardingStep: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: [
        "onboarding",
        "approval_pending",
        "approved",
        "rejected",
        "archived",
      ],
      default: "onboarding",
    },

    /* ================= GST ================= */

    gstin: {
      type: String,
      default: "",
    },

    /* ================= PAN ================= */

    pan: {
      number: {
        type: String,
        default: "",
      },

      name: {
        type: String,
        default: "",
      },

      documentUrl: {
        type: String,
        default: "",
      },
    },

    /* ================= SHIPPING ================= */

    shippingPreferences: {
      shippingType: {
        type: String,
        enum: ["easy_ship", "self_ship"],
        default: "easy_ship",
      },

      deliveryChargeMode: {
        type: String,
        enum: ["seller_pays", "customer_pays"],
        default: "customer_pays",
      },
    },

    /* ================= BANK ================= */

    bankDetails: {
      accountName: {
        type: String,
        default: "",
      },

      accountNumber: {
        type: String,
        default: "",
      },

      ifscCode: {
        type: String,
        default: "",
      },
    },

    /* ================= CONSENT ================= */

    consentForm: {
      agreed: {
        type: Boolean,
        default: false,
      },

      signatureUrl: {
        type: String,
        default: "",
      },

      submittedAt: {
        type: Date,
      },
    },

    resetOtp: String,

    resetOtpExpire: Date,

    /* ================= ANALYTICS ================= */

    averageRating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    /* ================= ARCHIVE ================= */

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* ================= PASSWORD HASH ================= */

sellerSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  // 🔥 skip hash for google accounts
  if (!this.password) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

});

module.exports = mongoose.model("Seller", sellerSchema);