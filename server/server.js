require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

require("./config/passport");

/* ================= CONNECT DB ================= */
connectDB();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

/* ================= ROUTES ================= */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));   // ✅ ADDED
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/artisans", require("./routes/artisanRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/districts", require("./routes/districtRoutes"));
app.use("/api/newsletter", require("./routes/newsletterRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/seller", require("./routes/sellerRoutes"));

/* ================= ROOT ================= */

app.get("/", (req, res) => {
  res.send("OdishaCrafts API Running...");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});