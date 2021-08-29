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
    console.log("user id: ", req.user._id);

    Product.findById(incomingProduct._id)
      .then(async (existingProduct) => {
        console.log("existing product's ppu: ", existingProduct);
        await Cart.findOne({ user: req.user._id })
          .then((cart) => {
            console.log("cart: ", cart);
            console.log(
              "quantity: ",
              incomingProduct.quantity,
              typeof incomingProduct.quantity
            );
            console.log(
              "existing product's ppu: ",
              existingProduct.pricePerUnit,
              typeof existingProduct.pricePerUnit
            );

            if (!cart) {
              const userCart = new Cart({
                user: req.user._id,
                products: new Array(1).fill({
                  _id: incomingProduct._id,
                  quantity: incomingProduct.quantity,
                }),
                totalAmount:
                  incomingProduct.quantity * existingProduct.pricePerUnit,
              });

              userCart.save();
            } else {
              cart.totalAmount +=
                +incomingProduct.quantity * existingProduct.pricePerUnit;
              cart.products.push({
                _id: incomingProduct._id,
                quantity: +incomingProduct.quantity,
              });
              cart.save();
            }
          })
          .then(() => res.status(200).send())
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .send({ error: "Couldn't add to cart", details: err });
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
    let orderId;
    Cart.findOne({ user: req.user._id })
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
