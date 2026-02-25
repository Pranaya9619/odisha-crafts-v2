import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import { ARTISANS } from "../../data/artisans";
import { useStore } from "../../context/StoreContext";
import { ShoppingBag, Heart } from "lucide-react";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const [showReviewBox, setShowReviewBox] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);

  const product = PRODUCTS.find((p) => p.id === id);
  const artisan = ARTISANS.find((a) => a.id === product?.artisanId);
  const [reviews, setReviews] = useState(product?.reviews || []);

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          Product not found.
        </div>
      </PageTransition>
    );
  }

  const isWishlisted = wishlist.some((w) => w.id === product.id);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const StarDisplay = ({ value }) => (
    <div className="flex">
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          className={`text-xl ${
            value >= star ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const handleSubmitReview = () => {
    if (!newReview.trim() || rating === 0 || !userName.trim()) return;

    const reviewData = {
      id: Date.now(),
      rating,
      comment: newReview,
      user: userName,
    };

    setReviews((prev) => [reviewData, ...prev]);
    setNewReview("");
    setRating(0);
    setUserName("");
    setShowReviewBox(false);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const customersAlsoBought = PRODUCTS.filter(
    (p) => p.id !== product.id
  ).slice(0, 4);

  return (
    <PageTransition>
      <div className="py-16 bg-white min-h-screen">

        {/* PRODUCT SECTION */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full h-[500px] object-cover shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />

          <div>
            <h1 className="text-3xl font-serif font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-orange-700">
              ₹{Number(product.price).toLocaleString()}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <StarDisplay value={averageRating} />
              <span className="text-sm text-gray-600">
                {averageRating} ({reviews.length} reviews)
              </span>
            </div>

            <p className="text-stone-600 mt-6 mb-8">
              {product.description}
            </p>

            <div className="flex gap-4 mb-10">
              <motion.button
                whileHover={{ y: -3 }}
                onClick={() => addToCart(product)}
                className="flex-1 bg-stone-900 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-black transition"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 border rounded-lg flex items-center justify-center transition ${
                  isWishlisted
                    ? "text-red-500 border-red-500"
                    : "text-stone-400"
                }`}
              >
                <Heart size={24} />
              </motion.button>
            </div>

            <div className="bg-stone-100 p-6 rounded-xl">
              <h3 className="font-bold mb-2">Artisan</h3>
              <p>{artisan?.name}</p>
              <p className="text-sm text-stone-500">
                {artisan?.location}
              </p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 underline text-sm"
            >
              Go Back
            </button>
          </div>
        </motion.div>

        {/* CUSTOMERS ALSO BOUGHT */}
        <Section title="Customers also bought" items={customersAlsoBought} navigate={navigate} />

        {/* RELATED PRODUCTS */}
        <Section title="Related Products" items={relatedProducts} navigate={navigate} />

        {/* REVIEWS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 mt-20"
        >
          {reviews.map((review) => (
            <div key={review.id} className="border-b py-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.user}</h4>
                <StarDisplay value={review.rating} />
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </motion.div>

        {/* REVIEW FORM */}
        <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Review this product
          </h2>

          {!showReviewBox && (
            <button
              onClick={() => setShowReviewBox(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-md"
            >
              Write a Product Review
            </button>
          )}

          {showReviewBox && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col items-center space-y-5"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full md:w-2/3 border p-3 rounded-md"
              />

              <div className="flex gap-2">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                rows="4"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full md:w-2/3 border p-3 rounded-md"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSubmitReview}
                  className="bg-green-600 text-white px-6 py-2 rounded-md"
                >
                  Submit
                </button>

                <button
                  onClick={() => setShowReviewBox(false)}
                  className="border px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>

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
          key={item.id}
          whileHover={{ y: -4 }}
          onClick={() => navigate(`/product/${item.id}`)}
          className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h3 className="font-medium text-sm mb-1">{item.name}</h3>
          <p className="text-orange-700 font-semibold text-sm">
            ₹{Number(item.price).toLocaleString()}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ProductDetails;