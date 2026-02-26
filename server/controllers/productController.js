const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("artisan", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data" });
  }
};