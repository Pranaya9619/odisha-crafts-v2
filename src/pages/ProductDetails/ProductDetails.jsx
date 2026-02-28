import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { ShoppingBag, Heart } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";
import API from "../../services/api";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [customersAlsoBought, setCustomersAlsoBought] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleWishlist = () => {
    if (!user) {
      localStorage.setItem(
        "pendingWishlist",
        JSON.stringify(product)
      );

      navigate("/login", {
        state: { from: `/product/${product._id}` },
      });

      return;
    }

    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    if (!user) {
      localStorage.setItem("pendingCart", JSON.stringify(product));

      navigate("/login", {
        state: { from: `/product/${product._id}` },
      });

      return;
    }

    addToCart(product);
  };

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Product fetch error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= FETCH RELATED ================= */

  useEffect(() => {
    if (!product) return;

    const fetchExtras = async () => {
      try {
        const res = await API.get("/products");
        const allProducts = res.data || [];

        setRelatedProducts(
          allProducts
            .filter(
              (p) =>
                p.category === product.category &&
                p._id !== product._id
            )
            .slice(0, 4)
        );

        setCustomersAlsoBought(
          allProducts
            .filter((p) => p._id !== product._id)
            .slice(0, 4)
        );
      } catch (err) {
        console.error("Extras fetch error:", err);
      }
    };

    fetchExtras();
  }, [product]);

  /* ================= DERIVED VALUES ================= */

  const isWishlisted =
    product &&
    wishlist?.some((item) => item?._id === product?._id);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce(
      (acc, r) => acc + Number(r.rating || 0),
      0
    );
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          Loading product...
        </div>
      </PageTransition>
    );
  }

  /* ================= SUBMIT REVIEW ================= */

  const handleSubmitReview = async () => {
    if (!newReview.trim() || rating === 0) return;

    try {
      await API.post(
        `/products/${product._id}/reviews`,
        {
          rating,
          comment: newReview,
        }
      );

      const res = await API.get(`/products/${product._id}`);
      setReviews(res.data.reviews);

      setNewReview("");
      setRating(0);
      setShowReviewBox(false);
    } catch (err) {
      console.error("Review error:", err);
    }
  };

  return (
    <PageTransition>
      <div className="py-16 bg-white min-h-screen">

        {/* ================= PRODUCT SECTION ================= */}

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

            {/* ARTISAN + DISTRICT */}
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              {product.artisan?.name && (
                <p>
                  Crafted by{" "}
                  <span
                    onClick={() => navigate("/artisans")}
                    className="font-medium text-orange-600 cursor-pointer hover:underline"
                  >
                    {product.artisan.name}
                  </span>
                </p>
              )}

              <p className="text-gray-500">
                📍 {product.artisan?.district || product.district}, Odisha
              </p>
            </div>

            {/* RATING SUMMARY */}
            <div className="mt-6">
              <p className="text-yellow-600 font-medium">
                ⭐ {averageRating} / 5
              </p>
              <p className="text-sm text-gray-500">
                {reviews.length} review
                {reviews.length !== 1 && "s"}
              </p>
            </div>

            <p className="text-stone-600 mt-6 mb-8">
              {product.description}
            </p>

            <div className="flex gap-4 mb-10">

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-stone-900 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>

              {/* WISHLIST */}
              <button
                onClick={() => {
                  if (!user) {
                    localStorage.setItem("pendingWishlist", JSON.stringify(product));
                    navigate("/login", {
                      state: { from: `/product/${product._id}` },
                    });
                    return;
                  }

                  toggleWishlist(product);
                }}
                className={`w-14 h-14 border rounded-lg flex items-center justify-center ${
                  isWishlisted
                    ? "text-red-500 border-red-500"
                    : "text-stone-400"
                }`}
              >
                <Heart size={24} />
              </button>

            </div>

            <button
              onClick={() => navigate(-1)}
              className="underline text-sm"
            >
              Go Back
            </button>
          </div>
        </motion.div>

        {/* ================= REVIEWS SECTION ================= */}

        <div className="max-w-7xl mx-auto mt-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Reviews & Ratings
            </h2>

            {/* REVIEW LIST */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">
                      {review.name || "Guest"}
                    </p>
                    <p className="text-yellow-500">
                      {"★".repeat(review.rating)}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* ADD REVIEW BUTTON */}
            <button
              onClick={() => setShowReviewBox(!showReviewBox)}
              className="mt-8 mx-auto block px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Write a Review
            </button>

            {/* REVIEW FORM */}
            {showReviewBox && (
              <div className="mt-6 bg-white border p-6 rounded-xl shadow-md">
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer text-2xl ${
                        star <= rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full border rounded-lg p-3 mb-4"
                />

                <button
                  onClick={handleSubmitReview}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= EXTRA SECTIONS ================= */}

        <Section
          title="Customers also bought"
          items={customersAlsoBought}
          navigate={navigate}
        />

        <Section
          title="Related Products"
          items={relatedProducts}
          navigate={navigate}
        />
      </div>
    </PageTransition>
  );
};

const Section = ({ title, items, navigate }) => (
  <div className="max-w-7xl mx-auto px-4 mt-24">
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <motion.div
          key={item._id}
          whileHover={{ y: -4 }}
          onClick={() => navigate(`/product/${item._id}`)}
          className="cursor-pointer bg-white rounded-xl shadow p-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h3 className="font-medium text-sm mb-1">
            {item.name}
          </h3>
          <p className="text-orange-700 font-semibold text-sm">
            ₹{Number(item.price).toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ProductDetails;