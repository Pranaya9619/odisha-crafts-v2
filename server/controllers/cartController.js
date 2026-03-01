const User = require("../models/User");

/* ================= GET CART ================= */

exports.getCart = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("cart.product")
    .populate("wishlist");

  res.json({
    cart: user.cart,
    wishlist: user.wishlist,
  });
};

/* ================= ADD TO CART ================= */

exports.addToCart = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  const existing = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    user.cart.push({ product: productId, quantity: 1 });
  }

  await user.save();

  res.json({ message: "Cart updated" });
};

/* ================= REMOVE FROM CART ================= */

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();

  res.json({ message: "Item removed" });
};

/* ================= TOGGLE WISHLIST ================= */

exports.toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  const exists = user.wishlist.find(
    (id) => id.toString() === productId
  );

  if (exists) {
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );
  } else {
    user.wishlist.push(productId);
  }

  await user.save();

  res.json({ message: "Wishlist updated" });
};