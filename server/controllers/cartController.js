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

  const user = await User.findOneAndUpdate(
    {
      _id: req.user._id,
      "cart.product": productId,
    },
    {
      $inc: { "cart.$.quantity": 1 },
    },
    { returnDocument: "after" }
  );

  if (!user) {
    await User.findByIdAndUpdate(req.user._id, {
      $push: { cart: { product: productId, quantity: 1 } },
    });
  }

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

exports.increaseQty = async (req, res) => {
  const { productId } = req.params;

  await User.findOneAndUpdate(
    {
      _id: req.user._id,
      "cart.product": productId,
    },
    {
      $inc: { "cart.$.quantity": 1 },
    }
  );

  res.json({ message: "Quantity increased" });
};

exports.decreaseQty = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  const itemIndex = user.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  if (user.cart[itemIndex].quantity <= 1) {
    // 🔥 Remove item if quantity would become 0
    user.cart.splice(itemIndex, 1);
  } else {
    user.cart[itemIndex].quantity -= 1;
  }

  await user.save();

  await user.populate("cart.product");

  res.json({
    cart: user.cart,
    wishlist: user.wishlist,
  });
};