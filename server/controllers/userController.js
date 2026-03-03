const User = require("../models/User");
const crypto = require("crypto");

/* ================= GET PROFILE ================= */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-otp -otpExpires")
      .populate("wishlist")
      .populate("cart.product");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ================= UPDATE BASIC PROFILE ================= */

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;

    if (phone && phone !== user.phone) {
      user.phone = phone;
      user.isPhoneVerified = false; // reset verification if changed
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

    if (user.isEmailVerified) {
      return res.json({ message: "Email already verified" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    // 🔥 TODO: Integrate real email service here
    console.log("EMAIL OTP:", otp);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyEmailOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.user._id);

    user.clearExpiredOTP();

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

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

    const otp = crypto.randomInt(100000, 999999).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 🔥 TODO: Integrate Twilio later
    console.log("PHONE OTP:", otp);

    res.json({ message: "OTP sent to phone" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send phone OTP" });
  }
};

exports.verifyPhoneOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findById(req.user._id);

    user.clearExpiredOTP();

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isPhoneVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

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