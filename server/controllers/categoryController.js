// server/controllers/categoryController.js

const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
};