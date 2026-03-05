const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

/* ================= GET PROFILE ================= */

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .select("+password -emailOTP -emailOTPExpires -phoneOTP -phoneOTPExpires")
      .populate("wishlist")
      .populate("cart.product");

    const userObj = user.toObject();

    userObj.passwordSet = !!user.password;

    delete userObj.password;

    res.json(userObj);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ================= UPDATE BASIC PROFILE ================= */

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, email, removeEmail, removePhone } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;

    /* ================= EMAIL ================= */

    if (removeEmail) {
      return res.status(400).json({
        message: "At least one email id is required.",
      });
    }

    if (email !== undefined) {
      const trimmedEmail = email.trim().toLowerCase();

      // If same email → no change
      if (trimmedEmail === user.email) {
        return res.json({
          message: "Changes saved.",
          user,
        });
      }

      // Check if email exists in another account
      const existingUser = await User.findOne({ email: trimmedEmail });

      if (
        existingUser &&
        existingUser._id.toString() !== user._id.toString()
      ) {
        return res.status(400).json({
          message:
            "This email is already connected with another account.",
        });
      }

      user.email = trimmedEmail;
      user.isEmailVerified = false;
    }

    /* ================= PHONE ================= */

    if (removePhone) {
      user.phone = undefined;
      user.isPhoneVerified = false;
    }

    if (phone !== undefined && phone !== user.phone) {
      user.phone = phone;
      user.isPhoneVerified = false;
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

/* ================= EMAIL VERIFICATION ================= */

exports.sendEmailOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.email) {
      return res.status(400).json({ message: "Add email first" });
    }

    if (user.isEmailVerified) {
      return res.json({ message: "Email already verified" });
    }

    const rawOTP = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(rawOTP, 10);

    user.emailOTP = hashedOTP;
    user.emailOTPExpires = Date.now() + 5 * 60 * 1000; // 5 mins

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "OdishaCrafts Email Verification",
      html: `
        <h2>Your Verification Code</h2>
        <p>Your OTP is:</p>
        <h1>${rawOTP}</h1>
        <p>This expires in 5 minutes.</p>
      `,
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email OTP" });
  }
};

exports.verifyEmailOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.user._id);

    user.clearExpiredOTPs();

    if (!user.emailOTP || !user.emailOTPExpires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.emailOTP);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isEmailVerified = true;
    user.emailOTP = undefined;
    user.emailOTPExpires = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
};

/* ================= PHONE VERIFICATION ================= */

exports.sendPhoneOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.phone) {
      return res.status(400).json({ message: "Add phone number first" });
    }

    const rawOTP = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(rawOTP, 10);

    user.phoneOTP = hashedOTP;
    user.phoneOTPExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    // 🔥 DEV MODE SMS
    console.log("PHONE OTP:", rawOTP);

    res.json({ message: "OTP sent to phone (dev mode)" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send phone OTP" });
  }
};

exports.verifyPhoneOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.user._id);

    user.clearExpiredOTPs();

    if (!user.phoneOTP || !user.phoneOTPExpires) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.phoneOTP);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isPhoneVerified = true;
    user.phoneOTP = undefined;
    user.phoneOTPExpires = undefined;

    await user.save();

    res.json({ message: "Phone verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Phone verification failed" });
  }
};

/* ================= ADDRESS MANAGEMENT ================= */

exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const newAddress = req.body;

    if (newAddress.isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
    }

    user.addresses.push(newAddress);

    await user.save();

    res.json({ message: "Address added", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Failed to add address" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, req.body);

    if (req.body.isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
      address.isDefault = true;
    }

    await user.save();

    res.json({ message: "Address updated", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Failed to update address" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.remove();

    await user.save();

    res.json({ message: "Address deleted", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address" });
  }
};

exports.changePassword = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔒 User created with Google → no password
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google login. Set a password first."
      });
    }

    const currentPassword = req.body.currentPassword?.trim();
    const newPassword = req.body.newPassword?.trim();
    console.log("Incoming currentPassword:", `"${currentPassword}"`);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect."
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters."
      });
    }

    user.password = newPassword;

    await user.save();

    res.json({
      message: "Password updated successfully."
    });

  } catch (error) {
    console.log("CHANGE PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.setPassword = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If password already exists
    if (user.password) {
      return res.status(400).json({
        message: "Password already exists. Use change password."
      });
    }

    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters."
      });
    }

    user.password = newPassword;

    await user.save();

    res.json({
      message: "Password added successfully. You can now login with email & password."
    });

  } catch (error) {
    console.log("SET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Failed to set password" });
  }
};