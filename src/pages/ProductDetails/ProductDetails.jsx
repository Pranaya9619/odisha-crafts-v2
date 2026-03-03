import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const [cartFeedback, setCartFeedback] = useState(false);
  const [wishlistFeedback, setWishlistFeedback] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setReviews(res.data.reviews || []);

        // Fetch related products (same category, exclude current)
        const related = await API.get(
          `/products?category=${res.data.category}`
        );

        const filtered = related.data
          .filter((p) => p._id !== res.data._id)
          .slice(0, 4);

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= DERIVED ================= */

  const isWishlisted =
    product && wishlist?.some((item) => item?._id === product?._id);

  const alreadyReviewed = reviews.find(
    (r) => r.user === user?._id
  );

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce(
      (acc, r) => acc + Number(r.rating || 0),
      0
    );
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  // 🎯 Random Estimated Delivery (6–8 days)
  const estimatedDays = useMemo(() => {
    return Math.floor(Math.random() * 3) + 6; // 6-8
  }, []);

  /* ================= HANDLERS ================= */

  const handleAddToCart = async () => {
    if (!user) {
      localStorage.setItem(
        "postLoginAction",
        JSON.stringify({
          type: "cart",
          productId: product._id,
        })
      );

      navigate("/login", {
        state: { from: `/product/${product._id}` },
      });

      return;
    }

    await addToCart(product);
    setCartFeedback(true);
    setTimeout(() => setCartFeedback(false), 2000);
  };

  const handleWishlist = async () => {
    if (!user) {
      localStorage.setItem(
        "postLoginAction",
        JSON.stringify({
          type: "wishlist",
          productId: product._id,
        })
      );

      navigate("/login", {
        state: { from: `/product/${product._id}` },
      });

      return;
    }

    const wasWishlisted = wishlist?.some(
      (item) => item?._id === product?._id
    );

    await toggleWishlist(product);

    setWishlistFeedback(wasWishlisted ? "removed" : "added");
    setTimeout(() => setWishlistFeedback(null), 2000);
  };

  const handleSubmitReview = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!newReview.trim() || rating === 0) return;

    try {
      if (editingReviewId) {
        await API.put(
          `/products/${product._id}/reviews/${editingReviewId}`,
          { rating, comment: newReview }
        );
        setEditingReviewId(null);
      } else {
        await API.post(`/products/${product._id}/reviews`, {
          rating,
          comment: newReview,
        });
      }

      const res = await API.get(`/products/${product._id}`);
      setReviews(res.data.reviews);

      setNewReview("");
      setRating(0);
      setShowReviewBox(false);
    } catch (err) {
      console.error("Review error:", err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await API.delete(
        `/products/${product._id}/reviews/${reviewId}`
      );

      const res = await API.get(`/products/${product._id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Delete review error:", err);
    }
  };

  const handleEditReview = (review) => {
    setNewReview(review.comment);
    setRating(review.rating);
    setEditingReviewId(review._id);
    setShowReviewBox(true);
  };

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          Loading product...
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="py-16 bg-white min-h-screen">

        {/* ================= PRODUCT ================= */}

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12"
        >
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full h-[500px] object-cover shadow-lg"
          />

          <div>
            <h1 className="text-3xl font-serif font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-orange-700">
              ₹{Number(product.price).toLocaleString()}
            </p>

            <div className="mt-4 text-yellow-500 font-medium">
              ⭐ {averageRating} ({reviews.length} reviews)
            </div>

            <div className="mt-6 mb-6 text-stone-600">
              {product.description}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-3 relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 bg-stone-900 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.85 }}
                animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                onClick={handleWishlist}
                className={`w-14 h-14 border rounded-lg flex items-center justify-center transition-all duration-300 ${isWishlisted
                  ? "bg-red-50 border-red-500 text-red-500"
                  : "text-stone-400 hover:text-red-500"
                  }`}
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </motion.button>
            </div>

            {/* Estimated Delivery */}
            <p className="text-sm text-stone-500 mb-3">
              🚚 Estimated Delivery: {estimatedDays}–{estimatedDays + 1} days
            </p>

            {/* Back to Shop */}
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-black transition"
            >
              <ArrowLeft size={16} />
              Back to Shop
            </button>

            <AnimatePresence>
              {cartFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-600 text-sm mt-2"
                >
                  Added to Cart ✨
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {wishlistFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm mt-2 ${wishlistFeedback === "added"
                    ? "text-pink-600"
                    : "text-red-600"
                    }`}
                >
                  {wishlistFeedback === "added"
                    ? "Added to Wishlist ❤️"
                    : "Removed from Wishlist"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ================= PEOPLE ALSO BOUGHT ================= */}

        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto mt-24 px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              People Also Bought
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover rounded-lg mb-3"
                  />
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-orange-600 font-semibold text-sm">
                    ₹{Number(item.price).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= REVIEWS ================= */}

        <div className="max-w-3xl mx-auto mt-24 px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Reviews & Ratings
          </h2>

          {/* 👇 Put it here */}
          {alreadyReviewed && (
            <p className="text-center text-green-600 mb-6">
              You’ve already reviewed this product ✨
            </p>
          )}

          {/* 👇 ADD THIS HERE */}
          {user && !alreadyReviewed && (
            <div className="text-center mb-8">
              <button
                onClick={() => setShowReviewBox((prev) => !prev)}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                {showReviewBox ? "Cancel Review" : "Add Review"}
              </button>
            </div>
          )}

          <AnimatePresence>
            {showReviewBox && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gray-50 p-6 rounded-xl shadow-md mb-8"
              >
                {/* Rating */}
                <div className="flex gap-2 mb-4 justify-center text-2xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={
                        star <= rating ? "text-yellow-500" : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border rounded-lg mb-4 resize-none"
                  rows={4}
                />

                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-stone-900 text-white py-2 rounded-lg hover:bg-black transition"
                >
                  Submit Review
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 👇 Existing Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => {
              const isOwner =
                review.user === user?._id ||
                review.user?._id === user?._id;

              return (
                <div
                  key={review._id}
                  className="bg-gray-50 p-5 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between mb-2 items-center">
                    <p className="font-medium">
                      {review.name || "Guest"}
                    </p>

                    <div className="flex items-center gap-3">
                      <p className="text-yellow-500">
                        {"★".repeat(review.rating)}
                      </p>

                      {isOwner && (
                        <div className="flex gap-2 text-xs">
                          <button
                            onClick={() => handleEditReview(review)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteReview(review._id)
                            }
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {review.comment}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default ProductDetails;