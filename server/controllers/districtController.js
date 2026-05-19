// server/controllers/districtController.js

const District = require("../models/District");

exports.getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find().sort({ name: 1 });

    res.json(districts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch districts",
    });
  }
};