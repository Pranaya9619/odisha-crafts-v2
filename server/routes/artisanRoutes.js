const express = require("express");
const router = express.Router();

const {
  createArtisan,
  getAllArtisans,
  getArtisanById,
  updateArtisan,
  deleteArtisan,
} = require("../controllers/artisanController");


// Later we protect these with admin middleware

router.post("/", createArtisan);
router.get("/", getAllArtisans);
router.get("/:id", getArtisanById);
router.put("/:id", updateArtisan);
router.delete("/:id", deleteArtisan);

module.exports = router;