const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Artisan = require("./models/Artisan");

dotenv.config();

const seedArtisans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to DB");

    await Artisan.deleteMany();

    const artisans = await Artisan.insertMany([
    {
        name: "Raghunath Mohapatra",
        district: "Puri",
        craft: "Pattachitra",
        bio: "A third-generation Pattachitra artist known for Krishna Leela scrolls using natural pigments and handmade cloth canvas.",
        image: "https://www.thegoodloop.com/wp-content/uploads/2022/01/akhil-pawar-XCd_6nOdzjo-unsplash-1160x754.jpeg",
        quote: "Art is devotion. Every stroke is an offering.",
        experience: "30+ Years",
    },
    {
        name: "Gopal Chitrakar",
        district: "Raghurajpur",
        craft: "Pattachitra",
        bio: "Traditional Chitrakar specializing in palm leaf engraving and mythological storytelling art.",
        image: "https://media.licdn.com/dms/image/v2/D4D12AQFsK_G3iOWSLg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1702122874916?e=2147483647&v=beta&t=GnyGY55ijUMYZjI9dqn5BDTCCaHYJVsoCNGr_MmowYE",
        quote: "Stories of the gods live through our hands.",
        experience: "22 Years",
    },
    {
        name: "Sukanti Das",
        district: "Sambalpur",
        craft: "Sambalpuri Ikat",
        bio: "Expert Ikat weaver preserving ancient Bandha techniques through vibrant handwoven textiles.",
        image: "https://s7d1.scene7.com/is/image/wbcollab/shutterstock_551163163?qlt=90&fmt=webp&resMode=sharp2",
        quote: "Weaving is patience woven into color.",
        experience: "18 Years",
    },
    {
        name: "Bibhuti Tarakasi",
        district: "Cuttack",
        craft: "Silver Filigree",
        bio: "Master Tarakasi craftsman creating delicate silver filigree ornaments and heritage jewelry.",
        image: "https://rangde.imgix.net/images/fund-page/artisans/artisans-ts-react-2.jpg?auto=compress,format?auto=compress,format",
        quote: "Silver bends, but tradition never does.",
        experience: "25 Years",
    },
    {
        name: "Pratima Nayak",
        district: "Keonjhar",
        craft: "Terracotta",
        bio: "Creates handcrafted terracotta sculptures inspired by tribal folklore and rural Odisha traditions.",
        image: "https://cdn.shopify.com/s/files/1/0281/8729/5828/files/Leshemi_7_Process_Weaving_LESHEMI-80_15x10_300_1024x1024.jpg?v=1596651748",
        quote: "Clay remembers the stories of our land.",
        experience: "15 Years",
    },
    {
        name: "Anita Behera",
        district: "Bhubaneswar",
        craft: "Palm Engraving",
        bio: "Talapatra Chitra specialist engraving scriptures and mythological scenes onto palm leaves.",
        image: "https://images.yourstory.com/cs/wordpress/2018/07/rendered.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=85",
        quote: "Every engraving is a whisper from the past.",
        experience: "20 Years",
    },
    ]);

    console.log("✅ Artisan seed complete");
        process.exit();
    } catch (error) {
        console.error("❌ Seed error:", error);
        process.exit(1);
    }
};

seedArtisans();