const Order = require("../models/Order");
const Product = require("../models/Product");


/* ================= DASHBOARD STATS ================= */

exports.getSellerDashboard = async (req, res) => {

  try {

    const sellerId = req.seller._id;

    /* ---------- PRODUCTS ---------- */

    const products = await Product.find({ seller: sellerId });

    const productCount = products.length;


    /* ---------- ORDERS ---------- */

    const orders = await Order.find({
      "items.seller": sellerId,
      paymentStatus: "paid"
    }).populate("items.product user");


    /* ---------- REVENUE ---------- */

    let revenue = 0;

    orders.forEach(order => {

      order.items.forEach(item => {

        if (item.seller.toString() === sellerId.toString()) {

          revenue += item.price * item.quantity;

        }

      });

    });


    /* ---------- ORDER COUNT ---------- */

    const orderCount = orders.length;


    /* ---------- RECENT ORDERS ---------- */

    const recentOrders = orders.slice(0, 5).map(order => {

      const item = order.items.find(
        i => i.seller.toString() === sellerId.toString()
      );

      return {
        id: order._id,
        product: item.product.name,
        buyer: order.user.name,
        price: item.price * item.quantity,
        status: order.orderStatus
      };

    });


    /* ---------- TOP PRODUCTS ---------- */

    const topProducts = await Product.find({ seller: sellerId })
      .sort({ sales: -1 })
      .limit(5)
      .select("name sales");


    /* ---------- RATING ---------- */

    let rating = 0;

    if (products.length > 0) {

      const totalRatings = products.reduce(
        (acc, p) => acc + p.averageRating,
        0
      );

      rating = (totalRatings / products.length).toFixed(1);

    }


    res.json({

      stats: {
        revenue,
        orders: orderCount,
        products: productCount,
        rating
      },

      recentOrders,

      topProducts

    });

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Dashboard fetch failed"
    });

  }

};



/* ================= REVENUE CHART ================= */

exports.getRevenueChart = async (req, res) => {

  try {

    const sellerId = req.seller._id;

    const orders = await Order.find({
      "items.seller": sellerId,
      paymentStatus: "paid"
    });

    const revenueMap = {};

    orders.forEach(order => {

      const date = order.createdAt.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
      });

      let dailyRevenue = 0;

      order.items.forEach(item => {

        if (item.seller.toString() === sellerId.toString()) {

          dailyRevenue += item.price * item.quantity;

        }

      });

      revenueMap[date] = (revenueMap[date] || 0) + dailyRevenue;

    });

    const chartData = Object.keys(revenueMap).map(date => ({
      date,
      revenue: revenueMap[date]
    }));

    res.set("Cache-Control", "no-store");
    res.json(chartData);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Chart data failed"
    });

  }

};