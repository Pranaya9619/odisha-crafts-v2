const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
},
{ timestamps: true }
);

const productSchema = new mongoose.Schema(
{
  name: { type: String, required: true },

  price: { type: Number, required: true },

  image: String,

  category: String,

  district: String,

  description: String,

  stock: {
    type: Number,
    default: 0,
  },

  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artisan",
    required: true,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },

  /* NEW FIELD FOR ANALYTICS */
  sales: {
    type: Number,
    default: 0,
  },

  reviews: [reviewSchema],

  averageRating: {
    type: Number,
    default: 0,
  },

  numReviews: {
    type: Number,
    default: 0,
  },
},
{ timestamps: true }
);

productSchema.pre(/^find/, function () {
  this.populate("artisan", "name craft district");
});

module.exports = mongoose.model("Product", productSchema);