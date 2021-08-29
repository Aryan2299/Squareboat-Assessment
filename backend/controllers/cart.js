const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const Product = mongoose.model("products");
const Order = mongoose.model("orders");

exports.getCart = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ userId: req.user._id })
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
    const productId = req.body.productId;
    Product.findById(productId)
      .then((product) => {
        console.log("product: ", product);
        Cart.findOne({ userId: req.user._id }).then((cart) => {
          if (!cart) {
            const userCart = new Cart({
              userId: req.user._id,
              products: new Array(1).fill(productId),
              totalAmount: product.pricePerUnit,
            });

            userCart.save();
          } else {
            cart.totalAmount += product.pricePerUnit;
            cart.products.push(productId);
            cart.save();
          }
          res.status(200).send("Saved to cart");
        });
      })
      .catch((err) =>
        res.status(500).send({ error: "Couldn't find product", details: err })
      );
  } else {
    res.status(401).send();
  }
};

exports.checkoutFromCart = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ userId: req.user._id })
      .then((cart) => {
        console.log("products: ", cart.products);
        if (cart.products.length === 0 || cart.totalAmount === 0) {
          res.status(409).send({
            error:
              "Empty cart. Please add items to your cart to place an order.",
          });
        } else {
          const newOrder = new Order({
            orderedBy: req.user._id,
            products: cart.products,
          });
          newOrder
            .save()
            .then((order) => {
              cart.products = [];
              cart.totalAmount = 0;
              cart.save();
              console.log("order id: ", order._id);
              res.status(200).send(order._id);
            })
            .catch((err) =>
              res
                .status(500)
                .send({ error: "Couldn't place order", details: err })
            );
        }
      })
      .catch((err) =>
        res
          .status(500)
          .send({ error: "Coudln't checkout from cart", details: err })
      );
  } else {
    res.status(401).send();
  }
};
