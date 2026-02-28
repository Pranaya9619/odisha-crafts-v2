// server/controllers/districtController.js

const District = require("../models/District");

exports.getAllDistricts = async (req, res) => {
  const districts = await District.find().sort({ name: 1 });
  res.json(districts);
};