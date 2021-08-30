const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");

require("./models/User");
require("./models/Product");
require("./models/Order");
require("./models/Cart");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");

app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/", (req, res, next) => res.status(200).send("Root"));

app.listen(process.env.PORT || 8080);
