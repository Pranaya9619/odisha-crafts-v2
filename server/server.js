require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const artisanRoutes = require("./routes/artisanRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cookieParser = require("cookie-parser");

require("./config/passport");

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", productRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/orders", orderRoutes);



app.get("/", (req, res) => {
  res.send("OdishaCrafts API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});