require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

require("./config/passport");

const couponRoutes = require("./routes/couponRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const sellerOrderRoutes = require("./routes/sellerOrderRoutes");
const sellerAnalyticsRoutes = require("./routes/sellerAnalyticsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const artisanRoutes = require("./routes/artisanRoutes");

/* ================= CONNECT DB ================= */

connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());

/* ================= STATIC UPLOADS ================= */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// OPTIONAL DEBUG LOGGER
// app.use((req, res, next) => {
//   console.log(req.method, req.originalUrl);
//   next();
// });

/* ================= ROUTES ================= */

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/orders",
  require("./routes/orderRoutes")
);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use(
  "/api/artisans",
  require("./routes/artisanRoutes")
);

app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/districts",
  require("./routes/districtRoutes")
);

app.use(
  "/api/newsletter",
  require("./routes/newsletterRoutes")
);

app.use(
  "/api/cart",
  require("./routes/cartRoutes")
);

app.use(
  "/api/coupons",
  couponRoutes
);

app.use(
  "/api/seller",
  sellerRoutes
);

app.use(
  "/api/seller/orders",
  sellerOrderRoutes
);

app.use(
  "/api/seller/analytics",
  sellerAnalyticsRoutes
);

app.use(
  "/api/seller/dashboard",
  require(
    "./routes/sellerDashboardRoutes"
  )
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use("/api/artisans", artisanRoutes);

/* ================= ROOT ================= */

app.get("/", (req, res) => {

  res.send(
    "OdishaCrafts API Running..."
  );

});

/* ================= 404 ================= */

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});

/* ================= ERROR HANDLER ================= */

app.use(
  (err, req, res, next) => {

    console.error(err);

    res.status(
      err.status || 500
    ).json({
      success: false,
      message:
        err.message ||
        "Server Error",
    });

  }
);

/* ================= SERVER ================= */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});