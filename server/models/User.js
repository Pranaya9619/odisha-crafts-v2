const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },

    /* ================= VERIFICATION ================= */

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    phone: {
      type: String,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    /* ================= OTP ================= */

    /* ================= EMAIL OTP ================= */

      emailOTP: {
        type: String,
      },

      emailOTPExpires: {
        type: Date,
      },

      /* ================= PHONE OTP ================= */

      phoneOTP: {
        type: String,
      },

      phoneOTPExpires: {
        type: Date,
      },

    /* ================= PROFILE ================= */

    avatar: {
      type: String,
    },

    addresses: [addressSchema],

    /* ================= CART + WISHLIST ================= */

    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

/* ================= HASH PASSWORD ================= */

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (!this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ================= PASSWORD COMPARE ================= */

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* ================= AUTO REMOVE EXPIRED OTP ================= */

userSchema.methods.clearExpiredOTPs = function () {
  const now = Date.now();

  if (this.emailOTPExpires && this.emailOTPExpires < now) {
    this.emailOTP = undefined;
    this.emailOTPExpires = undefined;
  }

  if (this.phoneOTPExpires && this.phoneOTPExpires < now) {
    this.phoneOTP = undefined;
    this.phoneOTPExpires = undefined;
  }
};

module.exports = mongoose.model("User", userSchema);