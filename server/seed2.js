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

    console.log("🧹 Old data cleared");

    /* ========= ARTISANS ========= */

    const artisans = await Artisan.insertMany([
      {
        name: "Raghunath Mohapatra",
        district: "Puri",
        craft: "Pattachitra",
        bio: "A third-generation Pattachitra artist known for Krishna Leela scrolls using natural pigments and handmade cloth canvas.",
        image: "https://www.thegoodloop.com/wp-content/uploads/2022/01/akhil-pawar-XCd_6nOdzjo-unsplash-1160x754.jpeg",
      },
      {
        name: "Gopal Chitrakar",
        district: "Raghurajpur",
        craft: "Pattachitra",
        bio: "Traditional Chitrakar specializing in palm leaf engraving and mythological storytelling art.",
        image: "https://media.licdn.com/dms/image/v2/D4D12AQFsK_G3iOWSLg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1702122874916?e=2147483647&v=beta&t=GnyGY55ijUMYZjI9dqn5BDTCCaHYJVsoCNGr_MmowYE",
      },
      {
        name: "Sukanti Das",
        district: "Sambalpur",
        craft: "Sambalpuri Ikat",
        bio: "Expert Ikat weaver preserving ancient Bandha techniques through vibrant handwoven textiles.",
        image: "https://s7d1.scene7.com/is/image/wbcollab/shutterstock_551163163?qlt=90&fmt=webp&resMode=sharp2",
      },
      {
        name: "Bibhuti Tarakasi",
        district: "Cuttack",
        craft: "Silver Filigree",
        bio: "Master Tarakasi craftsman creating delicate silver filigree ornaments and heritage jewelry.",
        image: "https://rangde.imgix.net/images/fund-page/artisans/artisans-ts-react-2.jpg?auto=compress,format?auto=compress,format",
      },
      {
        name: "Pratima Nayak",
        district: "Keonjhar",
        craft: "Terracotta",
        bio: "Creates handcrafted terracotta sculptures inspired by tribal folklore and rural Odisha traditions.",
        image: "https://cdn.shopify.com/s/files/1/0281/8729/5828/files/Leshemi_7_Process_Weaving_LESHEMI-80_15x10_300_1024x1024.jpg?v=1596651748",
      },
      {
        name: "Anita Behera",
        district: "Bhubaneswar",
        craft: "Palm Engraving",
        bio: "Talapatra Chitra specialist engraving scriptures and mythological scenes onto palm leaves.",
        image: "https://images.yourstory.com/cs/wordpress/2018/07/rendered.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=85",
      },
    ]);

    console.log("🎨 Artisans inserted");

    /* ========= PRODUCTS ========= */

    const products = [
      {
        name: "Krishna Leela Scroll",
        price: 4500,
        image: "https://www.memeraki.com/cdn/shop/files/Story-of-Shri-Krishna--CHERIYAL-SCROLL-PAINTING-BY-SAI-KIRAN-1_900x.png?v=1726244017",
        category: "Pattachitra",
        district: "Puri",
        description: "Hand-painted natural pigment scroll depicting Krishna Leela.",
        artisan: artisans[0]._id,
      },
      {
        name: "Dasavatara Panel Art",
        price: 5200,
        image: "https://prettyhomesindia.com/cdn/shop/files/6_ba930cd8-91ed-4cef-8207-b791cef64094.jpg?v=1731334450",
        category: "Pattachitra",
        district: "Raghurajpur",
        description: "Traditional Dasavatara narrative in classical Pattachitra style.",
        artisan: artisans[1]._id,
      },
      {
        name: "Red Sambalpuri Saree",
        price: 6800,
        image: "https://goswadeshi.in/cdn/shop/files/tri3d__2007__all_set0_nomo_folded2__2025-3-12-18-0-46__1000x1200_e473e793-7ad4-4417-b4ba-5ac5b06a4c56.jpg?v=1744017409",
        category: "Sambalpuri Ikat",
        district: "Sambalpur",
        description: "Traditional red Ikat saree with temple motifs and handwoven detailing.",
        artisan: artisans[2]._id,
      },
      {
        name: "Blue Ikat Dupatta",
        price: 2400,
        image: "https://www.maatshi.com/cdn/shop/files/ON776-01_e1557bea-73f0-43bf-b57c-3703bb63961b.jpg?v=1752929439&width=1600",
        category: "Sambalpuri Ikat",
        district: "Sambalpur",
        description: "Elegant handwoven Ikat dupatta made using Bandha weaving technique.",
        artisan: artisans[2]._id,
      },
      {
        name: "Silver Peacock Brooch",
        price: 3800,
        image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/brooch/r/s/g/rhinestone-silver-peacock-brooch-for-blazers-coats-men-women-1-original-imahgfx6xdyzdhz2.jpeg?q=70",
        category: "Silver Filigree",
        district: "Cuttack",
        description: "Intricate Tarakasi silver filigree peacock brooch handcrafted in Cuttack.",
        artisan: artisans[3]._id,
      },
      {
        name: "Filigree Necklace",
        price: 7200,
        image: "https://i.etsystatic.com/34190809/r/il/e87cba/3825565857/il_1588xN.3825565857_1jkj.jpg",
        category: "Silver Filigree",
        district: "Cuttack",
        description: "Traditional handcrafted silver necklace with fine wire detailing.",
        artisan: artisans[3]._id,
      },
      {
        name: "Terracotta Horse",
        price: 2100,
        image: "https://bongoniketan.in/cdn/shop/files/BengalhandmadeterracottaartifactproductfromPanchmura_Bishnupur_Bankura_WestBengalbyBONGONIKETAN12_36e47071-ca55-4945-b3e6-b35165bd7788.jpg?v=1717744396&width=990",
        category: "Terracotta",
        district: "Keonjhar",
        description: "Traditional handmade terracotta horse sculpture symbolizing rural heritage.",
        artisan: artisans[4]._id,
      },
      {
        name: "Palm Leaf Manuscript",
        price: 3000,
        image: "https://storeassets.im-cdn.com/media-manager/palmleafinnovations/tdwJJx76Qe9PZXNMKX6u_1_0x0_webp.jpg",
        category: "Palm Engraving",
        district: "Puri",
        description: "Engraved palm leaf manuscript featuring mythological scenes.",
        artisan: artisans[0]._id,
      },
      {
        name: "Palm Engraved Bookmark",
        price: 950,
        image: "https://i.etsystatic.com/27368197/r/il/72ccb4/3802978965/il_1588xN.3802978965_r9zu.jpg",
        category: "Palm Engraving",
        district: "Bhubaneswar",
        description: "Minimal engraved palm leaf bookmark with traditional motifs.",
        artisan: artisans[5]._id,
      },
    ];

    await Product.insertMany(products);

    console.log("🛍 Products inserted");
    console.log("✅ Database seeded with real images successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedData();