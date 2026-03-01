import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Cart = () => {
  const { cart = [], removeFromCart, increaseQty, decreaseQty } = useStore();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.product?.price) || 0;
    const qty = Number(item.quantity) || 1;
    return acc + price * qty;
  }, 0);

  const gst = subtotal * 0.05;
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + gst + shipping;

  const handlePlaceOrder = async () => {
    if (paymentMethod === "cod") {
      alert("🎉 Order placed with Cash on Delivery!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await response.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "OdishaCrafts",
        description: "Secure Artisan Checkout",
        order_id: order.id,
        handler: function (response) {
          alert("✅ Payment Successful!");
          console.log(response);
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("❌ Payment Failed");
      setLoading(false);
    }
  };

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
          
          {/* LEFT SIDE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-6"
          >
            {cart.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div
                  onClick={() => navigate(`/product/${item.product._id}`)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  {item.product?.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold text-lg hover:text-orange-600 transition">
                      {item.product?.name}
                    </h2>
                    <p className="text-stone-600">
                      ₹{Number(item.product?.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="w-8 h-8 border rounded-md hover:bg-stone-100 transition"
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item._id)}
                    className="w-8 h-8 border rounded-md hover:bg-stone-100 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:underline transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow p-6 h-fit"
          >
            <h2 className="text-xl font-semibold mb-4">Price Details</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>GST (5%)</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}
              </span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {!showCheckout && (
              <button
                onClick={() => setShowCheckout(true)}
                className="mt-6 w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition"
              >
                Checkout
              </button>
            )}

            {showCheckout && (
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Payment Method</h3>

                {["upi", "credit/debit", "cod"].map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method === "upi"
                      ? "UPI / Razorpay"
                      : method === "credit/debit"
                      ? "Credit / Debit Cards"
                      : "Cash on Delivery"}
                  </label>
                ))}

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-medium mt-4"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;