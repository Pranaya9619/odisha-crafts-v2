// models/FeaturedArtisan.js

const mongoose = require("mongoose");

const featuredArtisanSchema =
  new mongoose.Schema(
    {
      artisanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artisan",
        required: true,
      },

      article: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model(
  "FeaturedArtisan",
  featuredArtisanSchema
);