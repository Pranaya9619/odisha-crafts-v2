import React, { useState, useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";
import API from "../../services/api";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Cart = () => {
  const { cart = [], removeFromCart, increaseQty, decreaseQty } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { fetchCart } = useStore();

  //console.log("Cart user:", user);

  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [couponMessage, setCouponMessage] = useState(null);
  const [orderMessage, setOrderMessage] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  /* ================= CALCULATIONS ================= */

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = Number(item.product?.price) || 0;
      const qty = Number(item.quantity) || 1;
      return acc + price * qty;
    }, 0);
  }, [cart]);

  /* ================= CALCULATIONS ================= */

  const gst = subtotal * 0.18;
  const shipping = subtotal > 1000 ? 0 : 50;

  const amountBeforeDiscount = subtotal + gst;

  let total = amountBeforeDiscount + shipping;
  let discountAmount = 0;

  if (couponData) {
    if (couponData.discountType === "percentage") {
      discountAmount =
        (amountBeforeDiscount * couponData.discountValue) / 100;
      total -= discountAmount;
    }
    else if (couponData.discountType === "fixed") {
      discountAmount = couponData.discountValue;
      total -= discountAmount;
    }
    else if (couponData.discountType === "set") {
      discountAmount = total - couponData.discountValue;
      total = couponData.discountValue;
    }
  }

  total = Math.max(total, 0);

  const estimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toDateString();
  };

  /* ================= COUPON ================= */

  const applyCoupon = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCouponMessage({
          type: "error",
          text: data.message || "Invalid coupon",
        });
        return;
      }

      setCouponData(data);
      setCouponMessage({
        type: "success",
        text: `${data.discountValue}% discount applied 🎉`,
      });
    } catch (err) {
      setCouponMessage({
        type: "error",
        text: "Coupon error",
      });
    }
  };

  /* ================= ORDER ================= */

  const handlePlaceOrder = async () => {
    if (!user?.isEmailVerified) {
      setOrderMessage({
        type: "error",
        text: "Please verify your email before checkout.",
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/orders/create", {
        paymentMethod,
        couponCode,
      });

      // 🔥 COD OR FREE COUPON CASE
      if (paymentMethod === "cod" || data.message?.includes("coupon")) {
        await fetchCart();
        setOrderSuccess(true);

        setShowCheckout(false);   // optional clean UI reset
        setCouponData(null);
        setCouponCode("");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount * 100,
        currency: "INR",
        order_id: data.razorpayOrderId,

        handler: async function (response) {
          await API.post("/orders/verify", response);

          await fetchCart();

          setOrderSuccess(true);

          setShowCheckout(false);   // optional UI reset
          setCouponData(null);
          setCouponCode("");

        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      setOrderMessage({ type: "error", text: "Order failed" });
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMPTY CART ================= */

  if (!cart || cart.length === 0) {
    return (
      <PageTransition>
        <>
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

          {orderSuccess && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl"
              >
                <div className="text-5xl mb-4">🎉</div>

                <h2 className="text-2xl font-semibold mb-2 text-green-600">
                  Order Placed Successfully!
                </h2>

                <p className="text-gray-600 mb-6">
                  Your artisan is preparing your craft with care.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      navigate("/profile?tab=orders");
                    }}
                    className="bg-stone-900 text-white px-4 py-2 rounded-lg"
                  >
                    Go to Orders
                  </button>

                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      navigate("/shop");
                    }}
                    className="border border-stone-900 px-4 py-2 rounded-lg"
                  >
                    Browse More
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* {orderSuccess && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-2xl"
              >
                <div className="text-5xl mb-4">🎉</div>

                <h2 className="text-2xl font-semibold mb-2 text-green-600">
                  Order Placed Successfully!
                </h2>

                <p className="text-gray-600 mb-6">
                  Your artisan is preparing your craft with care.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      navigate("/profile?tab=orders");
                    }}
                    className="bg-stone-900 text-white px-4 py-2 rounded-lg"
                  >
                    Go to Orders
                  </button>

                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      navigate("/shop");
                    }}
                    className="border border-stone-900 px-4 py-2 rounded-lg"
                  >
                    Browse More
                  </button>
                </div>
              </motion.div>
            </div>
          )} */}
          </>
        </PageTransition>
        );
  }

        /* ================= MAIN UI ================= */

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
                    key={item.product._id}
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    {/* LEFT: IMAGE + DETAILS */}
                    <div
                      onClick={() => navigate(`/product/${item.product?._id}`)}
                      className="flex items-center gap-4 cursor-pointer"
                    >
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-sm hover:shadow-md transition"
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

                    {/* MIDDLE: QUANTITY */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => decreaseQty(item.product._id)}
                        className="w-8 h-8 border rounded-md hover:bg-stone-100 transition"
                      >
                        -
                      </button>

                      <span className="font-medium">{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.product._id)}
                        className="w-8 h-8 border rounded-md hover:bg-stone-100 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* RIGHT: REMOVE */}
                    <button
                      onClick={() => removeFromCart(item.product._id)}
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
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>

                {couponData && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>- ₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

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

                <p className="text-sm text-stone-500 mt-2">
                  Estimated Delivery: {estimatedDeliveryDate()}
                </p>

                {/* Coupon */}
                {showCheckout && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponMessage(null);
                      }}
                      className="w-full border rounded-md px-3 py-2 mb-2"
                    />

                    <button
                      onClick={applyCoupon}
                      className="w-full bg-black text-white py-2 rounded-md"
                    >
                      Apply Coupon
                    </button>

                    {/* 🔥 ERROR OR SUCCESS MESSAGE HERE */}
                    {couponMessage && (
                      <div
                        className={`mt-2 text-sm ${couponMessage.type === "error"
                          ? "text-red-600"
                          : "text-green-600"
                          }`}
                      >
                        {couponMessage.text}
                      </div>
                    )}

                    {/* 🧨 REMOVE COUPON BUTTON */}
                    {couponData && (
                      <button
                        onClick={() => {
                          setCouponData(null);
                          setCouponCode("");
                          setCouponMessage(null);
                        }}
                        className="mt-2 text-sm text-red-600 underline"
                      >
                        Remove Coupon
                      </button>
                    )}
                  </div>
                )}

                {!showCheckout && (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="mt-6 w-full bg-orange-600 text-white py-3 rounded-md"
                  >
                    Checkout
                  </button>
                )}

                {showCheckout && (
                  <div className="mt-6 space-y-4">

                    {/* Email not verified */}
                    {user && user.isEmailVerified === false && (
                      <div className="bg-red-50 border border-red-200 p-3 rounded-md text-sm">
                        Email not verified.
                        <button
                          onClick={() => navigate("/profile?tab=security")}
                          className="block mt-2 text-red-600 underline"
                        >
                          Verify Now
                        </button>
                      </div>
                    )}

                    <h3 className="font-semibold">Payment Method</h3>

                    {["razorpay", "cod"].map((method) => (
                      <label key={method} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="radio"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        {method === "razorpay" ? "Razorpay" : "Cash on Delivery"}
                      </label>
                    ))}

                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="w-full bg-green-600 text-white py-3 rounded-md font-medium"
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