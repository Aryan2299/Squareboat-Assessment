const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  productIds: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderedOn: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("orders", orderSchema);
