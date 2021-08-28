const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const Product = mongoose.model("products");
const Order = mongoose.model("orders");

exports.getCart = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ user: req.user._id })
      .then((cart) => {
        res.status(200).send(cart);
      })
      .catch((err) =>
        res.status(500).send({ error: "Couldn't get cart", details: err })
      );
  } else {
    res.status(401).send();
  }
};

exports.addToCart = async (req, res, next) => {
  if (req.user) {
    const { incomingProduct } = req.body;

    let existingProduct;

    await Product.findById(incomingProduct._id)
      .then((product) => (existingProduct = product))
      .catch((err) =>
        res.status(500).send({ error: "Couldn't find product", details: err })
      );

    Cart.find({ user: req.user._id })
      .then((cart) => {
        cart.totalAmount +=
          incomingProduct.quantity * existingProduct.pricePerUnit;
        cart.products = [
          ...cart.products,
          { _id: incomingProduct._id, quantity: incomingProduct.quantity },
        ];
        cart.save();
      })
      .then(() => res.status(200).send())
      .catch((err) =>
        res.status(500).send({ error: "Couldn't add to cart", details: err })
      );
  } else {
    res.status(401).send();
  }
};

exports.checkoutFromCart = (req, res, next) => {
  if (req.user) {
    let orderId;
    Cart.find({ user: req.user._id }).then(async (cart) => {
      await Order.updateOne(
        { orderedBy: req.user._id },
        { $push: { products: cart.products } }
      )
        .then((order) => (orderId = order._id))
        .catch((err) =>
          res.status(500).send({ error: "Couldn't place order", details: err })
        );
    });
    cart.products = [];
    cart.totalAmount = 0;
    return orderId
      .then((orderId) => res.status(200).send(orderId))
      .catch((err) =>
        res
          .status(500)
          .send({ error: "Coudln't checkout from cart", details: err })
      );
  } else {
    res.status(401).send();
  }
};
