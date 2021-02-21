const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const discountProductModel = new Schema({
  discount: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "ProductShop",
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  }
});
const Discount = mongoose.model(
  "discountProduct",
  discountProductModel,
  "discountProduct"
);

module.exports = Discount;
