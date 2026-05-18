// server/seeder/seeder.js

require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/Product");
const Seller = require("../models/Seller");
const Artisan = require("../models/Artisan");
const User = require("../models/User");

/* ================= DB ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("🔥 MongoDB Connected")
  )
  .catch((err) =>
    console.log("Mongo Error:", err)
  );

/* ================= HELPERS ================= */

const createReview = (
  userId,
  name,
  rating,
  comment
) => ({
  user: userId,
  name,
  rating,
  comment,
});

/* ================= SEED ================= */

const seedData = async () => {
  try {
    console.log(
      "🌪 Clearing previous data..."
    );

    await Product.deleteMany();
    await Artisan.deleteMany();
    await Seller.deleteMany();

    // 🔥 only remove seeded admin
    await User.deleteOne({
      email: "admin@odishacrafts.com",
    });

    /* ======================================================
       ADMIN USER
    ====================================================== */

    const admin = await User.create({
      name: "Pranaya Mallik",

      email: "admin@odishacrafts.com",

      password: "admin123",

      role: "admin",
    });

    console.log(
      "✅ Admin user created"
    );

    /* ======================================================
       SELLERS
    ====================================================== */

    const sellers =
      await Seller.insertMany([
        {
          email:
            "sambalpuri@seller.com",

          password: "seller123",

          name: "Rakesh Meher",

          phone: "9000000001",

          storeName:
            "Sambalpuri Weaves",

          businessAddress:
            "Sonepur, Odisha",

          onboardingCompleted: true,

          onboardingStep: 5,

          status: "approved",

          averageRating: 4.7,

          numReviews: 34,
        },

        {
          email:
            "pattachitra@seller.com",

          password: "seller123",

          name: "Subrat Maharana",

          phone: "9000000002",

          storeName:
            "Heritage Pattachitra",

          businessAddress:
            "Raghurajpur, Odisha",

          onboardingCompleted: true,

          onboardingStep: 5,

          status: "approved",

          averageRating: 4.9,

          numReviews: 41,
        },

        {
          email:
            "filigree@seller.com",

          password: "seller123",

          name: "Manoj Das",

          phone: "9000000003",

          storeName:
            "Cuttack Silver House",

          businessAddress:
            "Cuttack, Odisha",

          onboardingCompleted: true,

          onboardingStep: 5,

          status: "approved",

          averageRating: 4.6,

          numReviews: 27,
        },

        {
          email:
            "terracotta@seller.com",

          password: "seller123",

          name: "Suresh Behera",

          phone: "9000000004",

          storeName:
            "Terracotta Roots",

          businessAddress:
            "Balangir, Odisha",

          onboardingCompleted: true,

          onboardingStep: 5,

          status: "approved",

          averageRating: 4.5,

          numReviews: 19,
        },

        {
          email: "palm@seller.com",

          password: "seller123",

          name: "Bikram Nayak",

          phone: "9000000005",

          storeName:
            "Palm Leaf Studio",

          businessAddress:
            "Puri, Odisha",

          onboardingCompleted: true,

          onboardingStep: 5,

          status: "approved",

          averageRating: 4.8,

          numReviews: 52,
        },
      ]);

    console.log(
      "✅ Sellers created"
    );

    /* ======================================================
       ARTISANS
    ====================================================== */

    const artisans =
      await Artisan.insertMany([
        {
          name: "Jagannath Meher",

          district: "Sonepur",

          craft: "Sambalpuri Ikat",

          bio:
            "Traditional Sambalpuri master weaver.",

          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",

          quote:
            "Every thread tells a story.",

          experience: "25 Years",

          seller: sellers[0]._id,
        },

        {
          name:
            "Raghunath Maharana",

          district: "Puri",

          craft: "Pattachitra",

          bio:
            "Traditional Pattachitra painter.",

          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",

          quote:
            "Art is devotion.",

          experience: "30 Years",

          seller: sellers[1]._id,
        },

        {
          name: "Debasis Das",

          district: "Cuttack",

          craft:
            "Silver Filigree",

          bio:
            "Filigree jewelry craftsman.",

          image:
            "https://images.unsplash.com/photo-1504593811423-6dd665756598",

          quote:
            "Silver becomes poetry in skilled hands.",

          experience: "18 Years",

          seller: sellers[2]._id,
        },

        {
          name: "Kalia Behera",

          district: "Balangir",

          craft: "Terracotta",

          bio:
            "Terracotta sculpture artist.",

          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",

          quote:
            "Clay remembers the artist.",

          experience: "20 Years",

          seller: sellers[3]._id,
        },

        {
          name: "Harihar Nayak",

          district: "Puri",

          craft:
            "Palm Engraving",

          bio:
            "Palm leaf engraving artisan.",

          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43d",

          quote:
            "History carved into leaves.",

          experience: "22 Years",

          seller: sellers[4]._id,
        },
      ]);

    console.log(
      "✅ Artisans created"
    );

    /* ======================================================
       PRODUCTS
    ====================================================== */

    const products = [
      {
        name:
          "Royal Sambalpuri Saree",

        price: 4999,

        image:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c",

        category: "Textile",

        district: "Sonepur",

        description:
          "Handwoven Sambalpuri Ikat saree.",

        stock: 15,

        artisan: artisans[0]._id,

        seller: sellers[0]._id,

        sales: 42,

        reviews: [
          createReview(
            admin._id,
            "Pranaya Mallik",
            5,
            "Absolutely stunning craftsmanship."
          ),

          createReview(
            admin._id,
            "Pranaya Mallik",
            4,
            "Premium weaving quality."
          ),
        ],

        averageRating: 4.5,

        numReviews: 2,
      },

      {
        name:
          "Traditional Ikat Dupatta",

        price: 1499,

        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

        category: "Textile",

        district: "Sonepur",

        description:
          "Elegant Sambalpuri dupatta.",

        stock: 30,

        artisan: artisans[0]._id,

        seller: sellers[0]._id,

        sales: 20,

        reviews: [
          createReview(
            admin._id,
            "Pranaya Mallik",
            5,
            "Looks luxurious."
          ),
        ],

        averageRating: 5,

        numReviews: 1,
      },

      {
        name:
          "Dasavatara Pattachitra",

        price: 6999,

        image:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",

        category: "Painting",

        district: "Puri",

        description:
          "Traditional Dasavatara artwork.",

        stock: 8,

        artisan: artisans[1]._id,

        seller: sellers[1]._id,

        sales: 31,

        reviews: [
          createReview(
            admin._id,
            "Pranaya Mallik",
            5,
            "Museum-worthy piece."
          ),
        ],

        averageRating: 5,

        numReviews: 1,
      },

      {
        name:
          "Jagannath Pattachitra",

        price: 3499,

        image:
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",

        category: "Painting",

        district: "Puri",

        description:
          "Lord Jagannath themed art.",

        stock: 12,

        artisan: artisans[1]._id,

        seller: sellers[1]._id,

        sales: 14,

        reviews: [],

        averageRating: 0,

        numReviews: 0,
      },

      {
        name:
          "Silver Filigree Necklace",

        price: 8999,

        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",

        category: "Jewelry",

        district: "Cuttack",

        description:
          "Intricate silver filigree necklace.",

        stock: 6,

        artisan: artisans[2]._id,

        seller: sellers[2]._id,

        sales: 18,

        reviews: [
          createReview(
            admin._id,
            "Pranaya Mallik",
            5,
            "Insane detailing."
          ),
        ],

        averageRating: 5,

        numReviews: 1,
      },

      {
        name:
          "Silver Filigree Earrings",

        price: 2999,

        image:
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",

        category: "Jewelry",

        district: "Cuttack",

        description:
          "Elegant handcrafted earrings.",

        stock: 20,

        artisan: artisans[2]._id,

        seller: sellers[2]._id,

        sales: 26,

        reviews: [],

        averageRating: 0,

        numReviews: 0,
      },

      {
        name: "Terracotta Horse",

        price: 2499,

        image:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",

        category: "Decor",

        district: "Balangir",

        description:
          "Traditional terracotta horse sculpture.",

        stock: 10,

        artisan: artisans[3]._id,

        seller: sellers[3]._id,

        sales: 22,

        reviews: [],

        averageRating: 0,

        numReviews: 0,
      },

      {
        name:
          "Terracotta Wall Mask",

        price: 1899,

        image:
          "https://images.unsplash.com/photo-1517705008128-361805f42e86",

        category: "Decor",

        district: "Balangir",

        description:
          "Handmade tribal wall decor.",

        stock: 14,

        artisan: artisans[3]._id,

        seller: sellers[3]._id,

        sales: 12,

        reviews: [],

        averageRating: 0,

        numReviews: 0,
      },

      {
        name:
          "Palm Leaf Ramayana",

        price: 5499,

        image:
          "https://images.unsplash.com/photo-1512820790803-83ca734da794",

        category: "Engraving",

        district: "Puri",

        description:
          "Palm leaf engraved Ramayana scenes.",

        stock: 7,

        artisan: artisans[4]._id,

        seller: sellers[4]._id,

        sales: 15,

        reviews: [
          createReview(
            admin._id,
            "Pranaya Mallik",
            5,
            "Pure heritage energy."
          ),
        ],

        averageRating: 5,

        numReviews: 1,
      },

      {
        name:
          "Palm Leaf Bookmark Set",

        price: 799,

        image:
          "https://images.unsplash.com/photo-1516979187457-637abb4f9353",

        category: "Engraving",

        district: "Puri",

        description:
          "Hand engraved bookmarks.",

        stock: 40,

        artisan: artisans[4]._id,

        seller: sellers[4]._id,

        sales: 50,

        reviews: [],

        averageRating: 0,

        numReviews: 0,
      },
    ];

    /* ======================================================
       EXTRA PRODUCTS
    ====================================================== */

    for (let i = 1; i <= 5; i++) {
      products.push({
        name:
          `Odisha Craft Product ${i}`,

        price: 1000 + i * 400,

        image:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",

        category: "Handicraft",

        district: "Odisha",

        description:
          "Premium handcrafted Odisha product.",

        stock: 10 + i,

        artisan:
          artisans[
            i % artisans.length
          ]._id,

        seller:
          sellers[
            i % sellers.length
          ]._id,

        sales: 5 * i,

        reviews: [],

        averageRating: 4,

        numReviews: 0,
      });
    }

    await Product.insertMany(products);

    console.log(
      "✅ Products created"
    );

    console.log(`
======================================
🔥 SEED SUCCESSFUL
======================================

ADMIN LOGIN
EMAIL: admin@odishacrafts.com
PASSWORD: admin123

======================================

SELLER LOGIN
EMAIL: sambalpuri@seller.com
PASSWORD: seller123

======================================
`);

    process.exit();

  } catch (error) {
    console.log(
      "❌ Seeder Error:",
      error
    );

    process.exit(1);
  }
};

seedData();