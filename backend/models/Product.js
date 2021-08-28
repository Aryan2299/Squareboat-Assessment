const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
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
  quantityAvailable: {
    type: Number,
    required: true,
  },
});

mongoose.model("orders", orderSchema);
