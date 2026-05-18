const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Artisan = require("./models/Artisan");
const Product = require("./models/Product");
const Seller = require("./models/Seller");
const User = require("./models/User");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");

    /* ========= CLEAR ========= */
    await Product.deleteMany();
    await Artisan.deleteMany();
    await Seller.deleteMany();
    await User.deleteMany();

    console.log("🧹 DB cleared");

    /* ========= USERS ========= */
    const users = await User.insertMany([
      { name: "Aditi Sharma", email: "aditi@test.com", password: "123456" },
      { name: "Rahul Verma", email: "rahul@test.com", password: "123456" },
      { name: "Sneha Patel", email: "sneha@test.com", password: "123456" },
    ]);

    /* ========= SELLERS ========= */

    const sellers = [];

    for (const s of [
      {
        name: "Pranaya Mallik",
        email: "admin@test.com",
        password: "123456",
        phone: "9999999999",
        district: "Bhubaneswar",
        status: "approved",
        role: "admin",
        isArchived: false,
      },
      {
        name: "Pattachitra House",
        email: "pattachitra@test.com",
        password: "123456",
        phone: "8888888888",
        district: "Puri",
        status: "approved",
        role: "seller",
        isArchived: false,
      },
      {
        name: "Ikat Weavers",
        email: "ikat@test.com",
        password: "123456",
        phone: "7777777777",
        district: "Sambalpur",
        status: "consent_submitted",
        role: "seller",
        isArchived: false,
        consentForm: {
          signatureUrl: "https://dummyimage.com/200x80/000/fff&text=Signature",
        },
      },
    ]) {
      const created = await Seller.create(s); // 🔥 triggers hashing
      sellers.push(created);
    }

    const approvedSeller = sellers[1];

    /* ========= ARTISANS ========= */

    const artisans = await Artisan.insertMany([
      {
        name: "Raghunath Mohapatra",
        district: "Puri",
        craft: "Pattachitra",
        bio: "Master Pattachitra artist creating mythological scrolls.",
        image: "https://via.placeholder.com/300",
        seller: approvedSeller._id,
      },
      {
        name: "Sukanti Das",
        district: "Sambalpur",
        craft: "Sambalpuri Ikat",
        bio: "Expert Ikat weaver preserving Bandha techniques.",
        image: "https://via.placeholder.com/300",
        seller: approvedSeller._id,
      },
      {
        name: "Bibhuti Tarakasi",
        district: "Cuttack",
        craft: "Silver Filigree",
        bio: "Tarakasi craftsman specializing in silver jewelry.",
        image: "https://via.placeholder.com/300",
        seller: approvedSeller._id,
      },
    ]);

    /* ========= REVIEWS ========= */

    const makeReviews = () => {
      const reviews = [
        {
          user: users[0]._id,
          name: users[0].name,
          rating: 5,
          comment: "Insane quality 🔥",
        },
        {
          user: users[1]._id,
          name: users[1].name,
          rating: 4,
          comment: "Very authentic",
        },
      ];

      const avg =
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

      return {
        reviews,
        averageRating: avg,
        numReviews: reviews.length,
      };
    };

    /* ========= PRODUCTS ========= */

    const products = [
      {
        name: "Krishna Leela Scroll",
        price: 4500,
        category: "Pattachitra",
        district: "Puri",
        artisan: artisans[0]._id,
        seller: approvedSeller._id,
        isArchived: false,
      },
      {
        name: "Ikat Saree",
        price: 6500,
        category: "Sambalpuri Ikat",
        district: "Sambalpur",
        artisan: artisans[1]._id,
        seller: approvedSeller._id,
        isArchived: false,
      },
      {
        name: "Silver Necklace",
        price: 7200,
        category: "Silver Filigree",
        district: "Cuttack",
        artisan: artisans[2]._id,
        seller: approvedSeller._id,
        isArchived: true, // 🔥 archived product
      },
    ].map(p => ({
      ...p,
      ...makeReviews(),
    }));

    await Product.insertMany(products);

    console.log("🚀 SEEDED PERFECTLY");
    process.exit();

  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedData();