const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
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
});

mongoose.model("cart", cartSchema);
