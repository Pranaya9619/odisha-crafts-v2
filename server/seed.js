const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Artisan = require("./models/Artisan");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Artisan.deleteMany();

    /* ========= ARTISANS ========= */

    const artisans = await Artisan.insertMany([
      { name: "Raghunath Mohapatra", district: "Puri" },
      { name: "Gopal Chitrakar", district: "Raghurajpur" },
      { name: "Sukanti Das", district: "Sambalpur" },
      { name: "Bibhuti Tarakasi", district: "Cuttack" },
      { name: "Pratima Nayak", district: "Keonjhar" },
      { name: "Anita Behera", district: "Bhubaneswar" },
    ]);

    /* ========= PRODUCTS ========= */

    const products = [

      // PATTACHITRA
      {
        name: "Krishna Leela Scroll",
        price: 4500,
        image: "https://via.placeholder.com/400",
        category: "Pattachitra",
        district: "Puri",
        description: "Hand-painted natural pigment scroll depicting Krishna Leela.",
        artisan: artisans[0]._id,
      },
      {
        name: "Dasavatara Panel Art",
        price: 5200,
        image: "https://via.placeholder.com/400",
        category: "Pattachitra",
        district: "Raghurajpur",
        description: "Traditional Dasavatara narrative in Pattachitra style.",
        artisan: artisans[1]._id,
      },

      // SAMBALPURI IKAT
      {
        name: "Red Sambalpuri Saree",
        price: 6800,
        image: "https://via.placeholder.com/400",
        category: "Sambalpuri Ikat",
        district: "Sambalpur",
        description: "Traditional red Ikat saree with temple motifs.",
        artisan: artisans[2]._id,
      },
      {
        name: "Blue Ikat Dupatta",
        price: 2400,
        image: "https://via.placeholder.com/400",
        category: "Sambalpuri Ikat",
        district: "Sambalpur",
        description: "Elegant handwoven Ikat dupatta.",
        artisan: artisans[2]._id,
      },

      // SILVER FILIGREE
      {
        name: "Silver Peacock Brooch",
        price: 3800,
        image: "https://via.placeholder.com/400",
        category: "Silver Filigree",
        district: "Cuttack",
        description: "Intricate Tarakasi silver filigree peacock brooch.",
        artisan: artisans[3]._id,
      },
      {
        name: "Filigree Necklace",
        price: 7200,
        image: "https://via.placeholder.com/400",
        category: "Silver Filigree",
        district: "Cuttack",
        description: "Traditional handcrafted silver necklace.",
        artisan: artisans[3]._id,
      },

      // TERRACOTTA
      {
        name: "Terracotta Horse",
        price: 2100,
        image: "https://via.placeholder.com/400",
        category: "Terracotta",
        district: "Keonjhar",
        description: "Traditional handmade terracotta horse sculpture.",
        artisan: artisans[4]._id,
      },

      // PALM ENGRAVING
      {
        name: "Palm Leaf Manuscript",
        price: 3000,
        image: "https://via.placeholder.com/400",
        category: "Palm Engraving",
        district: "Puri",
        description: "Engraved palm leaf manuscript artwork.",
        artisan: artisans[0]._id,
      },
      {
        name: "Palm Engraved Bookmark",
        price: 950,
        image: "https://via.placeholder.com/400",
        category: "Palm Engraving",
        district: "Bhubaneswar",
        description: "Minimal engraved palm leaf bookmark.",
        artisan: artisans[5]._id,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ Database seeded according to schema + filters");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();