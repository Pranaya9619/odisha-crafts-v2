require("dotenv").config();

const bcrypt =
  require("bcryptjs");

const connectDB =
  require("../config/db");

const User =
  require("../models/User");

const seedAdmin =
  async () => {

    try {

      await connectDB();

      const existingAdmin =
        await User.findOne({
          email:
            "admin@odishacrafts.com",
        });

      if (existingAdmin) {

        console.log(
          "Admin already exists"
        );

        process.exit();

      }

      await User.create({

        name:
          "Super Admin",

        email:
          "admin@odishacrafts.com",

        password:
          "Admin@123",

        role: "admin",

      });

      console.log(
        "Admin seeded successfully"
      );

      process.exit();

    } catch (err) {

      console.error(err);

      process.exit(1);

    }
  };

seedAdmin();