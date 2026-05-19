const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/newsletterController");
const { protect } = require("../middleware/authMiddleware");
const Newsletter = require("../models/Newsletter");

router.post("/", subscribe);

router.get("/", protect, async (req, res) => {
  try {

    const subscribers =
      await Newsletter.find({
        isSubscribed: true,
      }).sort({ createdAt: -1 });

    res.json(subscribers);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch subscribers",
    });

  }
});

router.get("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.redirect(
        `${process.env.CLIENT_URL}/unsubscribe?status=error`
      );
    }

    await Newsletter.findOneAndDelete({ email });

    return res.redirect(
      `${process.env.CLIENT_URL}/unsubscribe?status=success&email=${email}`
    );

  } catch (error) {
    console.error(error);

    return res.redirect(
      `${process.env.CLIENT_URL}/unsubscribe?status=error`
    );
  }
});

module.exports = router;