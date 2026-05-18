const express = require("express");

const router = express.Router();

const {
  saveStory,
  getStoryByArtisan,
} = require("../controllers/artisanStoryController");

router.post("/", saveStory);

router.get("/:artisanId", getStoryByArtisan);

module.exports = router;