// server/models/Artisan.js
const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema({
  name: String,
  district: String,
  craft: String,
  bio: String,
  image: String,
  quote: String,
  experience: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Artisan", artisanSchema);