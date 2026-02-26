// models/Artisan.js
const mongoose = require("mongoose");

const artisanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    craftType: {
      type: String,
      required: true,
    },
    bio: String,
    image: String,
    verified: {
      type: Boolean,
      default: false,
    },
    impactScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artisan", artisanSchema);