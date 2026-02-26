const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 🔎 1️⃣ Check if user exists by email
        let user = await User.findOne({ email });

        if (user) {
          // 🔗 2️⃣ If user exists but no googleId, attach it
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        } else {
          // 🆕 3️⃣ Create new user if not exists
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});