const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const passport = require("passport");

require("./models/User");
require("./models/Product");
require("./models/Order");
require("./models/Cart");

const Product = mongoose.model("products");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

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

const { addNewProduct, getAllProducts } = require("./controllers/product");
const isAuth = require("./middleware/isAuth");

app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/secret", isAuth, (req, res) => res.send("secret"));
app.use("/", getAllProducts);

//seed data
// Product.countDocuments().then((count) => {
//   if (count === 0) {
//     addNewProduct({
//       title: "New Product",
//       photo: "https://some-url.com/google/image?id=123",
//       description: "Sample product",
//       quantityAvailable: 10,
//       pricePerUnit: 100,
//     });
//   }
// });

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
