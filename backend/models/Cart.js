const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: {
    type: [Object],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

mongoose.model("cart", cartSchema);
