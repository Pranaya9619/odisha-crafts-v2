const Newsletter = require("../models/Newsletter");
const sendEmail = require("../utils/sendEmail");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const exists = await Newsletter.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "Already subscribed ✨" });
    }

    // Save to DB
    await Newsletter.create({ email });

    // Send confirmation email (do not break API if it fails)
    try {
      await sendEmail(
        email,
        "Welcome to OdishaCrafts ✨",
        "Welcome to OdishaCrafts.",
        `
        <div style="font-family: 'Segoe UI', sans-serif; background:#fdf6ed; padding:40px;">
          <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:12px;">
            
            <h2 style="color:#c2410c; margin-bottom:10px;">
              Welcome to OdishaCrafts ✨
            </h2>

            <p style="color:#444; line-height:1.6;">
              You’re now part of a community celebrating timeless craftsmanship.
            </p>

            <p style="color:#444; line-height:1.6;">
              Expect artisan stories, exclusive collections, and cultural insights from Odisha.
            </p>

            <div style="margin:30px 0; text-align:center;">
              <a href="http://localhost:5173/shop"
                style="background:#c2410c; color:white; padding:12px 24px; 
                text-decoration:none; border-radius:6px;">
                Explore Collection
              </a>
            </div>

            <hr style="border:none; border-top:1px solid #eee;" />

            <p style="font-size:12px; color:#777;">
              If you wish to unsubscribe,
              <a href="http://localhost:5000/api/newsletter/unsubscribe?email=${email}">
                 click here
              </a>.
             </p>

            <p style="font-size:12px; color:#777;">
              If you didn’t subscribe, you can ignore this email.
            </p>

            <p style="font-size:12px; color:#777;">
              © ${new Date().getFullYear()} OdishaCrafts
            </p>
          </div>
        </div>
        `
);
    } catch (err) {
      console.log("Email failed but subscription saved");
    }

    res.status(201).json({ message: "Subscribed successfully ✨" });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({ message: "Already subscribed ✨" });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};