// routes/featuredArtisanRoutes.js

const express = require("express");

const router = express.Router();

const FeaturedArtisan =
  require("../models/FeaturedArtisan");

router.get("/", async (req, res) => {

  try {

    const artisans =
      await FeaturedArtisan
        .find()
        .populate("artisanId");

    res.json({
      success: true,
      artisans,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {

  try {

    const story =
      await FeaturedArtisan
        .findOne({
          artisanId: req.params.id,
        })
        .populate("artisanId");

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.json({
      success: true,
      story,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;