const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema(
  {
    productid: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    image: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("ProductImage", productImageSchema);
