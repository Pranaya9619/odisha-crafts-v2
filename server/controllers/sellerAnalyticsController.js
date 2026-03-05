const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getSellerAnalytics = async (req, res) => {
  try {

    const sellerId = req.seller._id;

    const products = await Product.find({ seller: sellerId });
    const productIds = products.map(p => p._id);

    const orders = await Order.find({
      "items.product": { $in: productIds }
    }).populate("items.product user");

    let totalRevenue = 0;
    let totalOrders = 0;

    orders.forEach(order => {

      order.items.forEach(item => {

        if (productIds.some(id => id.toString() === item.product._id.toString())) {

          totalRevenue += item.price * item.quantity;
          totalOrders++;

        }

      });

    });

    const lowStockProducts = products.filter(
      product => product.stock <= 5
    );



    /* ================= RECENT ORDERS ================= */

    const recentOrders = orders.slice(-5).map(order => {

      const item = order.items.find(i =>
        productIds.some(id => id.toString() === i.product._id.toString())
      );

      return {
        _id: order._id,
        product: item?.product?.name || "Product",
        buyer: order.user?.name || "Customer",
        price: item.price * item.quantity,
        status: order.orderStatus
      };

    });



    /* ================= TOP PRODUCTS ================= */

    const topProducts = await Product.find({ seller: sellerId })
      .sort({ sales: -1 })
      .limit(5)
      .select("name sales");



    res.json({
      totalProducts: products.length,
      totalOrders,
      totalRevenue,
      lowStockProducts,
      recentOrders,
      topProducts
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error",
    });

  }
};