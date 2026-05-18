// server/seeds/seed.js

const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Seller = require("../models/Seller");
const Artisan = require("../models/Artisan");
const Product = require("../models/Product");

const {
  sellers,
  artisans,
  products,
} = require("./seedData");

dotenv.config();

connectDB();

const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    await Artisan.deleteMany();
    await Seller.deleteMany();

    /* ================= SELLERS ================= */

    const createdSellers = await Seller.insertMany(sellers);

    /* ================= ARTISANS ================= */

    const artisansData = artisans.map((artisan, index) => ({
      ...artisan,
      seller: createdSellers[index]._id,
    }));

    const createdArtisans = await Artisan.insertMany(
      artisansData
    );

    /* ================= PRODUCTS ================= */

    const productsData = products.map((product, index) => ({
      ...product,

      artisan: createdArtisans[index]._id,

      seller: createdSellers[index]._id,
    }));

    await Product.insertMany(productsData);

    console.log("✅ Database Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error.message);

    process.exit(1);
  }
};

seedDatabase();