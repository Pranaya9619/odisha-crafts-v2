const Order = require("../models/Order");
const User = require("../models/User");

/* ================= CREATE ORDER ================= */

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    // Create snapshot items (protect against product changes later)
    const formattedItems = items.map(item => ({
      product: item.product,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
    }));

    const order = await Order.create({
      user: req.user._id,
      items: formattedItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });

    // Optional: Clear user's cart after successful order
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET MY ORDERS ================= */

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET CURRENT ORDERS ================= */

exports.getCurrentOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      orderStatus: { $in: ["placed", "processing", "shipped"] },
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET PAST ORDERS ================= */

exports.getPastOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      orderStatus: { $in: ["delivered", "cancelled"] },
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADMIN: GET ALL ORDERS ================= */

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADMIN: UPDATE ORDER STATUS ================= */

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;

      if (orderStatus === "delivered") {
        order.deliveredAt = Date.now();
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};