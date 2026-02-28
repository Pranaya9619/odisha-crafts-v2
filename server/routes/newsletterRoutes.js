const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/newsletterController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", subscribe);

router.get("/unsubscribe", async (req, res) => {
  const { email } = req.query;

  if (!email) return res.send("Invalid request");

  await Newsletter.findOneAndUpdate(
    { email },
    { isSubscribed: false }
  );

  res.send("You have been unsubscribed.");
});

router.get("/", protect, async (req, res) => {
  const subscribers = await Newsletter.find({ isSubscribed: true })
    .sort({ createdAt: -1 });

  res.json(subscribers);
});

module.exports = router;