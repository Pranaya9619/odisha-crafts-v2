const ArtisanStory = require("../models/ArtisanStory");


// CREATE / UPDATE STORY
exports.saveStory = async (req, res) => {
  try {
    const { artisanId, story } = req.body;

    const existing = await ArtisanStory.findOne({ artisanId });

    if (existing) {
      existing.story = story;
      await existing.save();

      return res.json(existing);
    }

    const newStory = await ArtisanStory.create({
      artisanId,
      story,
    });

    res.status(201).json(newStory);
  } catch (err) {
    console.log("SAVE STORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


// GET STORY BY ARTISAN ID
exports.getStoryByArtisan = async (req, res) => {
  try {
    const story = await ArtisanStory.findOne({
      artisanId: req.params.artisanId,
    });

    res.json(story);
  } catch (err) {
    console.log("GET STORY ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};