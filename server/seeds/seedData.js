// server/seeds/seedData.js

const sellers = [
  {
    name: "Raghunath Maharana",
    email: "raghunath@gmail.com",
    password: "123456",
    phone: "9876543210",

    storeName: "Pattachitra Heritage",
    businessAddress: "Raghurajpur, Puri, Odisha",

    onboardingCompleted: true,
    onboardingStep: 5,

    status: "approved",

    gstin: "21ABCDE1234F1Z5",

    averageRating: 4.8,
    numReviews: 32,
  },

  {
    name: "Subhasini Meher",
    email: "subhasini@gmail.com",
    password: "123456",
    phone: "9123456780",

    storeName: "Sambalpuri Looms",
    businessAddress: "Sambalpur, Odisha",

    onboardingCompleted: true,
    onboardingStep: 5,

    status: "approved",

    gstin: "21FGHIJ5678K1Z2",

    averageRating: 4.7,
    numReviews: 21,
  },

  {
    name: "Pratap Rana",
    email: "pratap@gmail.com",
    password: "123456",
    phone: "9988776655",

    storeName: "Silver Filigree Studio",
    businessAddress: "Cuttack, Odisha",

    onboardingCompleted: true,
    onboardingStep: 5,

    status: "approved",

    gstin: "21MNOPQ9876L1Z8",

    averageRating: 4.9,
    numReviews: 40,
  },
];

const artisans = [
  {
    name: "Raghunath Maharana",
    district: "Puri",
    craft: "Pattachitra",

    bio: "Traditional Pattachitra artist preserving Odisha heritage.",

    image: "/uploads/artisans/artisan1.jpg",

    quote: "Every brushstroke carries a story.",

    experience: "28 Years",

    featured: true,
  },

  {
    name: "Subhasini Meher",
    district: "Sambalpur",
    craft: "Sambalpuri Ikat",

    bio: "Expert artisan crafting authentic Sambalpuri Ikat sarees.",

    image: "/uploads/artisans/artisan2.jpg",

    quote: "Threads can sing too.",

    experience: "19 Years",

    featured: true,
  },

  {
    name: "Pratap Rana",
    district: "Cuttack",
    craft: "Silver Filigree",

    bio: "Master silver filigree craftsman from Odisha.",

    image: "/uploads/artisans/artisan3.jpg",

    quote: "Silver becomes poetry in skilled hands.",

    experience: "24 Years",

    featured: true,
  },
];

const products = [
  {
    name: "Krishna Leela Pattachitra",

    price: 4200,

    image: "/uploads/products/pattachitra1.jpg",

    category: "Pattachitra",

    district: "Puri",

    description:
      "Hand-painted Krishna Leela artwork using traditional Odisha techniques.",

    stock: 12,

    sales: 34,

    averageRating: 4.8,

    numReviews: 18,
  },

  {
    name: "Sambalpuri Ikat Saree",

    price: 6800,

    image: "/uploads/products/ikat1.jpg",

    category: "Handloom",

    district: "Sambalpur",

    description:
      "Authentic Sambalpuri Ikat saree woven by skilled artisans.",

    stock: 20,

    sales: 27,

    averageRating: 4.7,

    numReviews: 12,
  },

  {
    name: "Silver Filigree Peacock Necklace",

    price: 9500,

    image: "/uploads/products/filigree1.jpg",

    category: "Silver Filigree",

    district: "Cuttack",

    description:
      "Elegant handcrafted silver filigree necklace inspired by peacocks.",

    stock: 8,

    sales: 15,

    averageRating: 4.9,

    numReviews: 25,
  },
];

module.exports = {
  sellers,
  artisans,
  products,
};