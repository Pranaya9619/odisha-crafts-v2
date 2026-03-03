const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const User = require("../models/User");
const Coupon = require("../models/Coupon");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    const { paymentMethod, couponCode } = req.body;
    if (!user.cart.length)
      return res.status(400).json({ message: "Cart is empty" });

    // 🔥 Recalculate total from DB
    const subtotal = user.cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const gst = subtotal * 0.18;
    const shipping = subtotal > 1000 ? 0 : 50;

    let totalBeforeDiscount = subtotal + gst;

    let discount = 0;

    let total = subtotal + gst + shipping;

    if (couponCode && couponCode.trim() !== "") {

      const formattedCode = couponCode.trim().toUpperCase();
      const coupon = await Coupon.findOne({ code: formattedCode });

      if (!coupon || !coupon.active) {
        return res.status(400).json({ message: "Invalid coupon" });
      }

      if (coupon.discountType === "percentage") {
        total -= (total * coupon.discountValue) / 100;
      }

      else if (coupon.discountType === "fixed") {
        total -= coupon.discountValue;
      }

      else if (coupon.discountType === "set") {
        total = coupon.discountValue;
      }
    }

    total = Math.max(Math.round(total), 0);

    if (total <= 0) {
      const deliveryDays = Math.floor(Math.random() * 3) + 6;

      const order = await Order.create({
        user: user._id,
        items: user.cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: 0,
        paymentMethod: "coupon",
        paymentStatus: "paid",
        orderStatus: "placed",   // 🔥 ADD THIS
        estimatedDelivery: new Date(
          Date.now() + deliveryDays * 24 * 60 * 60 * 1000
        ),
      });
      await User.findByIdAndUpdate(user._id, { cart: [] });

      return res.json({
        message: "Order placed using coupon",
        order,
      });
    }

    if (req.body.paymentMethod === "cod") {
      const deliveryDays = Math.floor(Math.random() * 3) + 6;

      const order = await Order.create({
        user: user._id,
        items: user.cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: total,
        paymentMethod: "cod",
        paymentStatus: "pending",
        orderStatus: "placed",   // 🔥 ADD THIS
        estimatedDelivery: new Date(
          Date.now() + deliveryDays * 24 * 60 * 60 * 1000
        ),
      });

      await User.findByIdAndUpdate(user._id, { cart: [] });

      return res.json({ message: "COD order placed", order });
    }

    // 🔥 Razorpay flow
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
    });

    const deliveryDays = Math.floor(Math.random() * 3) + 6;

    const order = await Order.create({
      user: user._id,
      items: user.cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: total,
      paymentMethod: "razorpay",
      paymentStatus: "pending",   // 🔥 ADD THIS
      orderStatus: "placed",      // 🔥 ADD THIS
      razorpayOrderId: razorpayOrder.id,
      estimatedDelivery: new Date(
        Date.now() + deliveryDays * 24 * 60 * 60 * 1000
      ),
    });

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      orderId: order._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/* ================= VERIFY PAYMENT ================= */

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

  order.paymentStatus = "paid";
  order.razorpayPaymentId = razorpay_payment_id;

  await order.save();

  await User.findByIdAndUpdate(order.user, { cart: [] });

  res.json({ message: "Payment successful" });
};

/* ================= GET ALL ORDERS ================= */

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
};


/* ================= CURRENT ORDERS ================= */

exports.getCurrentOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    orderStatus: { $ne: "delivered" },
  })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
};


/* ================= PAST ORDERS ================= */

exports.getPastOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    orderStatus: "delivered",
  })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
};