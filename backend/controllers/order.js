const mongoose = require("mongoose");
const Order = mongoose.model("orders");

exports.getAllOrders = (req, res, next) => {
  if (req.user) {
    Order.find({ orderedBy: req.user._id })
      .then((orders) => {
        console.log("authorised");
        res.status(200).send(orders);
      })
      .catch((err) => {
        res.status(500).then({ error: "Couldn't fetch orders", details: err });
      });
  } else {
    res.status(401).send();
  }
};

exports.getOrder = (req, res, next) => {
  if (req.user) {
    const orderId = req.params.id;

    Order.findById(orderId)
      .then((order) => {
        res.status(200).send(order);
      })
      .catch((err) => {
        res.status(500).then({ error: "Couldn't fetch orders", details: err });
      });
  } else {
    res.status(401).send();
  }
};

exports.placeNewOrder = (req, res, next) => {
  if (req.user) {
    const newProductIds = req.body.productIds;

    const totalAmount = req.body.totalAmount;

    const newOrder = new Order({
      orderedBy: req.user._id,
      productIds: newProductIds,
      totalAmount,
    });

    newOrder
      .save()
      .then((order) => res.status(200).send(order._id))
      .catch((err) =>
        res.status(500).send({ error: "Couldn't place order", details: err })
      );
  } else {
    res.status(401).send();
  }
};
