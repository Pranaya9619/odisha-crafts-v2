import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist = [], toggleWishlist, addToCart } = useStore();

  const handleAddToCart = (item) => {
    if (!item) return;

    try {
      addToCart?.(item);
      toggleWishlist?.(item);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-center px-6">
          <h2 className="text-2xl font-serif text-stone-800 mb-4">
            Your wishlist is empty 🖤
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition"
          >
            Discover Crafts
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50 p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif mb-8 text-stone-800"
        >
          Your Wishlist
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              {item.image && (
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="h-56 overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h2 className="font-semibold text-lg text-stone-900 mb-2">
                  {item.name}
                </h2>

                <p className="mb-4 font-bold text-orange-700">
                  ₹{Number(item.price || 0).toLocaleString()}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-stone-900 text-white py-2 rounded-md hover:bg-black transition text-sm font-medium"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist?.(item)}
                    className="px-4 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-50 transition text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Wishlist;