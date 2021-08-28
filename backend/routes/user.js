const express = require("express");
const mongoose = require("mongoose");

const ordersController = require("../controllers/order");
const cartController = require("../controllers/cart");

require("../models/Order");
require("../models/Cart");

const router = express.Router();

router.get("/orders", ordersController.getAllOrders);
router.post("/orders/new", ordersController.placeNewOrder);
router.get("/cart", cartController.getCart);
router.post("/cart/add", cartController.addToCart);

module.exports = router;
