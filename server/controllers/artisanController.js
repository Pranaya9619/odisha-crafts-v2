const Artisan = require("../models/Artisan");

// CREATE
exports.createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create({
      ...req.body,
      seller: req.seller._id, // 🔥 ownership
    });

    res.status(201).json(artisan);
  } catch (err) {
    res.status(500).json({ message: "Failed to create artisan" });
  }
};

exports.getMyArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find({
      seller: req.seller._id,
    });

    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artisans" });
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
    const artisan = await Artisan.findOne({
      _id: req.params.id,
      seller: req.seller._id, // 🔥 only owner can update
    });

    if (!artisan)
      return res.status(404).json({ message: "Not found" });

    Object.assign(artisan, req.body);

    const updated = await artisan.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE
exports.deleteArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findOne({
      _id: req.params.id,
      seller: req.seller._id,
    });

    if (!artisan)
      return res.status(404).json({ message: "Not found" });

    await artisan.deleteOne();

    res.json({ message: "Artisan deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};