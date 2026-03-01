require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const artisanRoutes = require("./routes/artisanRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");
const newsletterRoutes = require("./routes/newsletterRoutes");

require("./config/passport");

connectDB();

const app = express();
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

app.use("/api/auth", require("./routes/authRoutes"));
//app.use("/api/products", productRoutes);
//app.use("/api/artisans", artisanRoutes);
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/artisans", require("./routes/artisanRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/districts", require("./routes/districtRoutes"));
app.use("/api/newsletter", newsletterRoutes);

app.get("/", (req, res) => {
  res.send("OdishaCrafts API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});