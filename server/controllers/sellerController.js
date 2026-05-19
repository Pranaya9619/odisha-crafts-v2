const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail =
  require("../utils/sendEmail");
const nodemailer = require("nodemailer");
/* =========================================================
   REGISTER → SEND OTP
========================================================= */

exports.registerSeller = async (req, res) => {
  try {

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email required",
      });
    }

    let seller = await Seller.findOne({
      email,
    });

    /* Existing Google account */
    if (
      seller?.authProvider ===
      "google"
    ) {

      seller.name = name;

    } else if (!seller) {

      seller = new Seller({
        name,
        email,
        authProvider: "local",
      });

    }

    /* Generate OTP */
    const otp = Math.floor(
      100000 +
      Math.random() * 900000
    ).toString();

    seller.otp = {
      code: otp,
      expiresAt: new Date(
        Date.now() +
        10 * 60 * 1000
      ),
    };

    await seller.save();

    await sendEmail({
      to: email,

      subject: "Your OdishaCrafts OTP",

      html: `
    <div style="font-family:sans-serif;padding:20px;">

      <h2>OdishaCrafts Seller Verification</h2>

      <p>Your OTP code is:</p>

      <h1>${otp}</h1>

      <p>
        This OTP expires in 10 minutes.
      </p>

    </div>
  `,
    });

    res.json({
      message:
        "OTP sent successfully",
      email,
    });

  } catch (err) {

    console.error(
      "REGISTER ERROR:",
      err
    );

    res.status(500).json({
      message: err.message,
    });

  }
};


/* =========================================================
   VERIFY OTP
========================================================= */

exports.verifySellerOTP = async (
  req,
  res
) => {
  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    const seller =
      await Seller.findOne({
        email,
      });

    if (!seller) {
      return res.status(400).json({
        message:
          "Seller not found",
      });
    }

    // FIXED: safe OTP checks
    if (
      !seller.otp ||
      !seller.otp.code ||
      seller.otp.code !== otp ||
      seller.otp.expiresAt <
      new Date()
    ) {
      return res.status(400).json({
        message:
          "Invalid or expired OTP",
      });
    }

    seller.password = password;

    seller.otp = {
      code: "",
      expiresAt: null,
    };

    await seller.save();

    const token = jwt.sign(
      {
        id: seller._id,
        role: "seller",
      },
      process.env
        .ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const safeSeller =
      await Seller.findById(
        seller._id
      ).select(
        "-password -otp -resetPasswordToken -resetPasswordExpires"
      );

    res.cookie(
      "sellerToken",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    res.status(201).json({
      seller: safeSeller,
      token,
    });

  } catch (err) {

    console.error(
      "OTP VERIFY ERROR:",
      err
    );

    res.status(500).json({
      message: err.message,
    });

  }
};


/* =========================================================
   LOGIN
========================================================= */

exports.loginSeller = async (
  req,
  res
) => {
  try {

    const {
      email,
      password,
    } = req.body;

    const seller =
      await Seller.findOne({
        email,
      });

    if (!seller) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    /* Google-only account */
    if (
      seller.authProvider ===
      "google" &&
      !seller.password
    ) {
      return res.status(400).json({
        message:
          "This account uses Google login",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        seller.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: seller._id,
        role: "seller",
      },
      process.env
        .ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const safeSeller =
      await Seller.findById(
        seller._id
      ).select(
        "-password -otp -resetPasswordToken -resetPasswordExpires"
      );

    res.cookie(
      "sellerToken",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    res.json({
      seller: safeSeller,
      token,
    });

  } catch (err) {

    console.error(
      "LOGIN ERROR:",
      err
    );

    res.status(500).json({
      message: "Server error",
    });

  }
};


/* =========================================================
   LOGOUT
========================================================= */

exports.logoutSeller = (
  req,
  res
) => {

  res.clearCookie(
    "sellerToken"
  );

  res.json({
    message:
      "Seller logged out",
  });

};


/* =========================================================
   GET PROFILE
========================================================= */

exports.getSellerProfile =
  async (req, res) => {
    try {

      if (!req.seller) {
        return res.status(401).json({
          message:
            "Seller not authenticated",
        });
      }

      const seller =
        await Seller.findById(
          req.seller._id
        ).select(
          "-password -otp -resetPasswordToken -resetPasswordExpires"
        );

      if (!seller) {
        return res.status(404).json({
          message:
            "Seller not found",
        });
      }

      res.json(seller);

    } catch (err) {

      console.error(
        "GET PROFILE ERROR:",
        err
      );

      res.status(500).json({
        message: err.message,
      });

    }
  };


/* =========================================================
   UPDATE PROFILE
========================================================= */

exports.updateSellerProfile =
  async (req, res) => {
    try {

      if (!req.seller) {
        return res.status(401).json({
          message:
            "Seller not authenticated",
        });
      }

      const seller =
        await Seller.findById(
          req.seller._id
        );

      if (!seller) {
        return res.status(404).json({
          message:
            "Seller not found",
        });
      }

      const {
        name,
        phone,
        businessAddress,
      } = req.body;

      seller.name =
        name || seller.name;

      seller.phone =
        phone || seller.phone;

      seller.businessAddress =
        businessAddress ||
        seller.businessAddress;

      const updatedSeller =
        await seller.save();

      res.json({
        message:
          "Profile updated successfully",
        seller:
          updatedSeller,
      });

    } catch (err) {

      console.error(
        "PROFILE UPDATE ERROR:",
        err
      );

      res.status(500).json({
        message: err.message,
      });

    }
  };


/* =========================================================
   CHANGE PASSWORD
========================================================= */

exports.changeSellerPassword =
  async (req, res) => {
    try {

      const seller =
        await Seller.findById(
          req.seller._id
        );

      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        seller.authProvider ===
        "google" &&
        !seller.password
      ) {
        return res.status(400).json({
          message:
            "Google accounts cannot change password",
        });
      }

      // FIXED: avoid bcrypt crash
      if (!seller.password) {
        return res.status(400).json({
          message:
            "Password not set for this account",
        });
      }

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          seller.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Current password incorrect",
        });
      }

      seller.password =
        newPassword;

      await seller.save();

      res.json({
        message:
          "Password updated successfully",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };


/* =========================================================
   FORGOT PASSWORD
========================================================= */



/* =========================================================
   RESET PASSWORD
========================================================= */



/* =========================================================
   SAVE ONBOARDING STEP
========================================================= */

exports.saveOnboardingStep =
  async (req, res) => {
    try {

      const seller =
        await Seller.findById(
          req.seller._id
        );

      if (!seller) {
        return res.status(404).json({
          message:
            "Seller not found",
        });
      }

      const { step, data } =
        req.body;

      /* STEP ORDER PROTECTION */

      // FIXED
      if (
        step !==
        seller.onboardingStep
      ) {
        return res.status(400).json({
          message:
            "Invalid onboarding step",
        });
      }

      /* STEP 1 */

      if (step === 1) {

        const gstRegex =
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

        if (
          !gstRegex.test(
            data.gstin
          )
        ) {
          return res.status(400).json({
            message:
              "Invalid GSTIN format",
          });
        }

        seller.gstin =
          data.gstin;
      }

      /* STEP 2 */

      if (step === 2) {

        const panRegex =
          /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (
          !panRegex.test(
            data.panNumber
          )
        ) {
          return res.status(400).json({
            message:
              "Invalid PAN format",
          });
        }

        seller.name =
          data.name;

        seller.pan = {
          number:
            data.panNumber,
          name: data.name,
          documentUrl:
            data.documentUrl,
        };
      }

      /* STEP 3 */

      if (step === 3) {

        if (
          !data.storeName?.trim()
        ) {
          return res.status(400).json({
            message:
              "Store name required",
          });
        }

        seller.storeName =
          data.storeName;
      }

      /* STEP 4 */

      if (step === 4) {

        if (
          !data.businessAddress ||
          data.businessAddress
            .trim()
            .length < 10
        ) {
          return res.status(400).json({
            message:
              "Valid business address required",
          });
        }

        const validShipping =
          [
            "easy_ship",
            "self_ship",
          ];

        if (
          !validShipping.includes(
            data.shippingType
          )
        ) {
          return res.status(400).json({
            message:
              "Invalid shipping type",
          });
        }

        const validDeliveryModes =
          [
            "seller_pays",
            "customer_pays",
          ];

        if (
          !validDeliveryModes.includes(
            data.deliveryChargeMode
          )
        ) {
          return res.status(400).json({
            message:
              "Invalid delivery mode",
          });
        }

        seller.businessAddress =
          data.businessAddress;

        seller.shippingPreferences =
        {
          shippingType:
            data.shippingType,

          deliveryChargeMode:
            data.deliveryChargeMode,
        };
      }

      /* STEP 5 */

      if (step === 5) {

        const ifscRegex =
          /^[A-Z]{4}0[A-Z0-9]{6}$/;

        if (
          !ifscRegex.test(
            data.ifscCode
          )
        ) {
          return res.status(400).json({
            message:
              "Invalid IFSC format",
          });
        }

        seller.bankDetails = {
          accountName:
            data.accountName,

          accountNumber:
            data.accountNumber,

          ifscCode:
            data.ifscCode,
        };
      }

      /* STEP 6 */

      if (step === 6) {

        if (!data.agreed) {
          return res.status(400).json({
            message:
              "You must accept terms",
          });
        }

        if (
          !data.signatureUrl
        ) {
          return res.status(400).json({
            message:
              "Signature required",
          });
        }

        seller.consentForm = {
          agreed: true,

          signatureUrl:
            data.signatureUrl,

          submittedAt:
            new Date(),
        };

        seller.onboardingCompleted =
          true;

        seller.status =
          "approval_pending";
      }

      seller.onboardingStep =
        step < 6
          ? step + 1
          : 6;

      await seller.save();

      res.json({
        message:
          `Step ${step} saved`,
        seller,
      });

    } catch (err) {

      console.error(
        "ONBOARDING ERROR:",
        err
      );

      res.status(500).json({
        message:
          err.message,
      });

    }
  };

  exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const seller =
      await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    // generate 6 digit otp
    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    seller.resetOtp = otp;

    seller.resetOtpExpire =
      Date.now() + 10 * 60 * 1000;

    await seller.save();

    // send email
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: seller.email,
      subject: "Password Reset OTP",
      html: `
        <h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>Expires in 10 minutes.</p>
      `,
    });

    res.json({
      message: "OTP sent",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

exports.resetPassword = async (req, res) => {

  try {

    const {
      email,
      otp,
      password,
    } = req.body;

    const seller =
      await Seller.findOne({
        email,
        resetOtp: otp,
        resetOtpExpire: {
          $gt: Date.now(),
        },
      });

    if (!seller) {
      return res.status(400).json({
        message:
          "Invalid or expired OTP",
      });
    }

    seller.password = password;

    seller.resetOtp = undefined;
    seller.resetOtpExpire = undefined;

    await seller.save();

    res.json({
      message:
        "Password reset successful",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};