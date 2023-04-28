const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    categories: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    buy_price: {
      type: Number,
      required: true,
    },
    sell_price: {
      type: Number,
      required: true,
    },
    img_path: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
