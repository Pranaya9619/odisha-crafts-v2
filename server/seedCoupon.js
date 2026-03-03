const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Coupon = require("./models/Coupon");

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Coupon.deleteMany();

  await Coupon.insertMany([
    {
      code: "FREE100",
      discountType: "percentage",
      discountValue: 100,
    },
    {
      code: "HALF50",
      discountType: "percentage",
      discountValue: 50,
    },
  ]);

  console.log("Coupons Seeded 🌱");
  process.exit();
};

seed();