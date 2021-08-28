const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  products: {
    type: [Object],
    required: true,
  },
});

mongoose.model("orders", orderSchema);
