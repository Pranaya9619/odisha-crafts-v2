// server/models/Artisan.js
const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    district: { type: String, required: true },
    craft: { type: String, required: true },

    bio: { type: String, required: true },
    image: { type: String },

    quote: { type: String },
    experience: { type: String },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artisan", artisanSchema);