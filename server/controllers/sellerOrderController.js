const Order = require("../models/Order");
const Product = require("../models/Product");


/* ================= GET SELLER ORDERS ================= */

exports.getSellerOrders = async (req, res) => {

  try {

    const sellerId = req.seller._id;

    const orders = await Order.find()
      .populate({
        path: "items.product",
        select: "name seller",
      })
      .populate("user", "name email");

    const sellerOrders = orders.filter(order =>
      order.items.some(item =>
        item.product && item.product.seller?.toString() === sellerId.toString()
      )
    );

    res.json(sellerOrders);

  } catch (err) {

    res.status(500).json({
      message: "Server error",
    });

  }

};


/* ================= UPDATE ORDER STATUS ================= */

exports.updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });

  } catch (err) {

    res.status(500).json({
      message: "Server error",
    });

  }

};