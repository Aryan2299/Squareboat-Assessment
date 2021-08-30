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
