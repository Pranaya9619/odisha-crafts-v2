const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const { category, district, artisan } = req.query;

  let filter = {};

  if (category) filter.category = category;
  if (district) filter.district = district;
  if (artisan) filter.artisan = artisan;

  const products = await Product.find(filter);
  res.json(products);
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("artisan", "name district");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const Artisan = require("../models/Artisan");

exports.createProduct = async (req, res) => {
  try {

    if (!req.seller) {
      return res.status(401).json({
        message: "Seller not authenticated",
      });
    }

    const { artisan, name } = req.body;

    const artisanDoc = await Artisan.findOne({
      _id: artisan,
      seller: req.seller._id,
    });

    if (!artisanDoc) {
      return res.status(400).json({
        message: "Invalid artisan selected",
      });
    }

    // ⭐ Duplicate product check
    const existing = await Product.findOne({
      name,
      seller: req.seller._id
    });

    if (existing) {
      return res.status(400).json({
        message: "Product with this name already exists"
      });
    }

    const product = await Product.create({
      ...req.body,
      seller: req.seller._id,
    });

    res.status(201).json(product);

  } catch (err) {

    console.error("CREATE PRODUCT ERROR:", err);

    res.status(500).json({
      message: "Failed to create product",
      error: err.message,
    });

  }
};
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    //console.log("REQ USER:", req.user);
    //console.log("BODY:", req.body);

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🛡 SAFE duplicate check
    const alreadyReviewed = product.reviews.find(
      (r) =>
        r.user &&
        r.user.toString() === req.user?._id?.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.averageRating =
      product.reviews.reduce(
        (acc, item) => acc + Number(item.rating || 0),
        0
      ) / product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    //console.error("ADD REVIEW ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const review = product.reviews.id(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  review.rating = rating;
  review.comment = comment;

  await product.save();

  res.json({ message: "Review updated" });
};

exports.deleteReview = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const review = product.reviews.id(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  review.deleteOne();

  await product.save();

  res.json({ message: "Review deleted" });
};

exports.getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({
      seller: req.seller._id
    })
      .populate("artisan", "name district")
      .sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.seller._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const allowedFields = [
      "name",
      "price",
      "description",
      "category",
      "district",
      "image",
      "artisan",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updated = await product.save();

    res.json(updated);

  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.seller._id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });

  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};