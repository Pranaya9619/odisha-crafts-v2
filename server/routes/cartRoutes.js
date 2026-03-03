const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  toggleWishlist,
  increaseQty,
  decreaseQty,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);
router.post("/wishlist", protect, toggleWishlist);
router.put("/increase/:productId", protect, increaseQty);
router.put("/decrease/:productId", protect, decreaseQty);
module.exports = router;