const express = require("express");
const router = express.Router();
const districtController = require("../controllers/districtController");

router.get("/", districtController.getAllDistricts);

module.exports = router;