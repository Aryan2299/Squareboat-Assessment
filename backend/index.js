const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");
const cors = require("cors");

require("./models/User");
require("./models/Product");
require("./models/Order");
require("./models/Cart");

const Product = mongoose.model("products");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(cors());

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");

const {
  addNewProduct,
  getAllProducts,
  getProducts,
} = require("./controllers/product");
const isAuth = require("./middleware/isAuth");

app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/secret", isAuth, (req, res) => res.send("secret"));
app.use("/products", productRoutes);

//seed data
// Product.countDocuments().then((count) => {
//   if (count === 0) {
// addNewProduct({
//   title: "Product",
//   photo: "https://some-url.com/image?id=123",
//   description: "product",

//   pricePerUnit: 250,
// });
//   }
// });

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
