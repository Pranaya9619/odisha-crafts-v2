// server/models/Product.js

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String, // snapshot of user name
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  district: String,
  description: String,
  artisan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artisan",
  },

  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);