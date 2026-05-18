const mongoose = require("mongoose");

const artisanStorySchema = new mongoose.Schema(
  {
    artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artisan",
      required: true,
      unique: true,
    },

    story: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArtisanStory", artisanStorySchema);