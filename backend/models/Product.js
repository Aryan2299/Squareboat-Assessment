const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
});

mongoose.model("products", productSchema);
