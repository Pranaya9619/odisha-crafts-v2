const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Seller = require("../models/Seller");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log("PROFILE RECEIVED:", profile);
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

/* =========================================================
   SELLER GOOGLE AUTH
========================================================= */

passport.use(
  "seller-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        `${process.env.BACKEND_URL}/api/seller/google/callback`,
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        const email =
          profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google email missing"),
            null
          );
        }

        // 🔥 FIND EXISTING SELLER
        let seller = await Seller.findOne({
          email,
        });

        /* =================================================
           EXISTING SELLER
        ================================================= */

        if (seller) {

          // 🔗 MERGE GOOGLE ACCOUNT
          if (!seller.googleId) {

            seller.googleId = profile.id;

            seller.authProvider = "google";

            await seller.save();
          }

        } else {

          /* =============================================
             CREATE NEW SELLER
          ============================================= */

          seller = await Seller.create({

            email,

            name:
              profile.displayName || "",

            googleId: profile.id,

            authProvider: "google",

            onboardingCompleted: false,

            onboardingStep: 1,

            status: "onboarding",
          });
        }

        done(null, seller);

      } catch (err) {

        console.error(
          "SELLER GOOGLE AUTH ERROR:",
          err
        );

        done(err, null);

      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {

    // 🔍 Try normal user first
    let account = await User.findById(id);

    // 🛍️ If not found, try seller
    if (!account) {
      account = await Seller.findById(id);
    }

    done(null, account);

  } catch (err) {

    done(err, null);

  }
});