const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userID: [
      {
        type: String,
        required: true,
      },
    ],
    productid: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("cart", cartSchema);
