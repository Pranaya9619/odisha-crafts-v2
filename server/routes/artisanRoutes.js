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

const { protectSeller } = require("../middleware/sellerAuthMiddleware");

// Public artisan routes
router.get("/", getAllArtisans);

// Seller dashboard routes
router.get("/my", protectSeller, getMyArtisans);
router.post("/", protectSeller, createArtisan);

// Public artisan page
router.get("/:id", getArtisanById);

// Seller management
router.put("/:id", protectSeller, updateArtisan);
router.delete("/:id", protectSeller, deleteArtisan);

module.exports = router;