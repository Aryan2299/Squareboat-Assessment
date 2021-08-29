const mongoose = require("mongoose");
const Product = mongoose.model("products");

const productService = require("../services/product");

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
  const { title, photo, description, pricePerUnit } = product;

  const newProduct = new Product({
    title,
    photo,
    description,
    pricePerUnit,
  });

  newProduct
    .save()
    .then((product) => console.log("Saved product: ", product))
    .catch((err) => console.error("Error: Failed to save "));
};

exports.getProducts = (req, res, next) => {
  const productIds = req.body.productIds;
  let productIdsWithQuantities = productService.getQuantity(productIds);

  console.log("quantities: ", productIdsWithQuantities);
  console.log("productIds received: ", productIds);

  Product.find({ _id: productIds })
    .then((products) => {
      console.log("products", products);
      res.status(200).send({ products, productIdsWithQuantities });
    })
    .catch((err) => {
      console.error("Error: Couldn't find products ");
    });
};
