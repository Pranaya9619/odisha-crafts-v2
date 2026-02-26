const Artisan = require("../models/Artisan");

// CREATE
exports.createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create(req.body);
    res.status(201).json(artisan);
  } catch (err) {
    res.status(500).json({ message: "Failed to create artisan" });
  }
};

// GET ALL
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artisans" });
  }
};

// GET BY ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan)
      return res.status(404).json({ message: "Artisan not found" });

    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: "Error fetching artisan" });
  }
};

// UPDATE
exports.updateArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE
exports.deleteArtisan = async (req, res) => {
  try {
    await Artisan.findByIdAndDelete(req.params.id);
    res.json({ message: "Artisan deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};