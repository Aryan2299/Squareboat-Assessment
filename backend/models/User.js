const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

mongoose.model("users", userSchema);
