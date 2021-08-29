const express = require("express");
const mongoose = require("mongoose");

const ordersController = require("../controllers/order");
const cartController = require("../controllers/cart");
const isAuth = require("../middleware/isAuth");

require("../models/Order");
require("../models/Cart");

const router = express.Router();

router.get("/orders", isAuth, ordersController.getAllOrders);
router.post("/orders/new", isAuth, ordersController.placeNewOrder);
// router.post("/orders/new", ordersController.placeNewOrder);
router.get("/cart", isAuth, cartController.getCart);
router.post("/cart/add", isAuth, cartController.addToCart);
router.get("/cart/checkout", isAuth, cartController.checkoutFromCart);

module.exports = router;
