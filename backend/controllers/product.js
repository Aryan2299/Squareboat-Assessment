const mongoose = require("mongoose");
const Product = mongoose.model("products");

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send({ error: "Couldn't fetch products", details: err });
    });
};

exports.addNewProduct = (product) => {
  const { title, photo, description, quantityAvailable, pricePerUnit } =
    product;

  const newProduct = new Product({
    title,
    photo,
    description,
    quantityAvailable,
    pricePerUnit,
  });

  newProduct
    .save()
    .then((product) => console.log("Saved product: ", product))
    .catch((err) => console.error("Error: Failed to save "));
};
