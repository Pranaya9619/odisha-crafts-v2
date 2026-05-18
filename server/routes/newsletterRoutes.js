const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/newsletterController");
const { protect } = require("../middleware/authMiddleware");
const Newsletter = require("../models/Newsletter");

router.post("/", subscribe);

router.get("/", protect, async (req, res) => {
  const subscribers = await Newsletter.find({ isSubscribed: true })
    .sort({ createdAt: -1 });

  res.json(subscribers);
});

router.get("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.redirect(
        "http://localhost:5173/unsubscribe?status=error"
      );
    }

    await Newsletter.findOneAndDelete({ email });

    return res.redirect(
      `http://localhost:5173/unsubscribe?status=success&email=${email}`
    );

  } catch (error) {
    console.error(error);

    return res.redirect(
      "http://localhost:5173/unsubscribe?status=error"
    );
  }
});

module.exports = router;