import React from "react";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProfileWishlist = () => {
  const { wishlist, toggleWishlist } = useStore();
  const navigate = useNavigate();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart size={40} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">Your wishlist is empty.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Your Wishlist</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.03 }}
            className="border rounded-2xl p-4 space-y-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            />

            <div>
              <p
                onClick={() => navigate(`/product/${item._id}`)}
                className="font-medium cursor-pointer hover:text-orange-600 transition"
              >
                {item.name}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => toggleWishlist(item)}
              className="w-full border text-red-500 py-2 rounded-lg hover:bg-red-50 transition text-sm"
            >
              Remove from Wishlist
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileWishlist;