import React from "react";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const gst = subtotal * 0.05;
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + gst + shipping;
  const savings = subtotal > 1000 ? 50 : 0;

  if (!cart || cart.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-center px-6">
          <h2 className="text-2xl font-serif mb-4">
            Your cart feels lonely 🥲
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition"
          >
            Explore Crafts
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
          className="text-3xl font-serif mb-8"
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - Cart Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-6"
          >
            {cart.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold text-lg hover:text-orange-600 transition">
                      {item.name}
                    </h2>
                    <p className="text-stone-600">
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 border rounded-md hover:bg-stone-100 transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 border rounded-md hover:bg-stone-100 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT SIDE - Price Summary / Pro UX */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow p-6 h-fit space-y-4"
          >
            <h2 className="text-xl font-semibold mb-2">Price Summary</h2>

            {/* Subtotal */}
            <div className="flex justify-between text-stone-700">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            {/* GST */}
            <div className="flex justify-between text-stone-700">
              <span>GST (5%)</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-stone-700">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                {shipping === 0 ? "Free 🚚" : `₹${shipping.toLocaleString()}`}
              </span>
            </div>

            {/* Savings */}
            {savings > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>You're saving</span>
                <span>₹{savings.toLocaleString()}</span>
              </div>
            )}

            <hr className="my-2" />

            {/* Total */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* Checkout */}
            <button
               onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition text-lg font-medium"
            >
              Proceed to Checkout
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;