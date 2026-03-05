const Artisan = require("../models/Artisan");
const Product = require("../models/Product");

// CREATE
exports.createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create({
      ...req.body,
      seller: req.seller._id, // 🔥 ownership
    });

    res.status(201).json(artisan);
  } catch (err) {
    console.log("CREATE ARTISAN ERROR:", err);
    res.status(500).json({
      message: "Failed to create artisan",
      error: err.message
    });
  }
};

exports.getMyArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find({
      seller: req.seller._id,
    }).sort({ createdAt: -1 });

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

    const allowedFields = [
      "name",
      "district",
      "craft",
      "bio",
      "image",
      "experience"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        artisan[field] = req.body[field];
      }
    });

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

    const linkedProducts = await Product.findOne({
      artisan: artisan._id,
    });

    if (linkedProducts) {
      return res.status(400).json({
        message: "Cannot delete artisan with existing products",
      });
    }

    await artisan.deleteOne();

    res.json({ message: "Artisan deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};