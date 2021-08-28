const mongoose = require("mongoose");
const Order = mongoose.model("orders");

exports.getAllOrders = (req, res, next) => {
  if (req.user) {
    Order.findOne({ orderedBy: req.user._id })
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

exports.placeNewOrder = (req, res, next) => {
  if (req.user) {
    const newProducts = req.body.products;

    Order.updateOne(
      { orderedBy: req.user._id },
      { $push: { products: newProducts } }
    )
      .then((order) => res.status(200).send(order._id))
      .catch((err) =>
        res.status(500).send({ error: "Couldn't place order", details: err })
      );
  } else {
    res.status(401).send();
  }
};
