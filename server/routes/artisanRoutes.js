const express = require("express");
const router = express.Router();

const {
  createArtisan,
  getMyArtisans,
  getAllArtisans,
  getArtisanById,
  updateArtisan,
  deleteArtisan,
} = require("../controllers/artisanController");
const { protectSeller } = require("../middleware/protectSeller");

// Later we protect these with admin middleware


router.get("/", getAllArtisans);
router.get("/:id", getArtisanById);
router.post("/", protectSeller, createArtisan);
router.get("/my", protectSeller, getMyArtisans);
router.put("/:id", protectSeller, updateArtisan);
router.delete("/:id", protectSeller, deleteArtisan);

module.exports = router;