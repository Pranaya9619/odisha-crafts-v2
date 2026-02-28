// server/models/District.js
const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("District", districtSchema);