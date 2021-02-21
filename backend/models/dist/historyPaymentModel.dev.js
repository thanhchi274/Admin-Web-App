"use strict";

var mongoose = require("mongoose");

var historyPaymentModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productId: [{
    type: Schema.Types.ObjectId,
    ref: 'ProductShop'
  }],
  price: {
    type: String
  },
  discount: {
    type: String
  },
  quantity: {
    type: String
  },
  category: {
    type: String
  },
  colors: {
    type: Array
  },
  tags: {
    type: Array
  },
  createAt: {
    type: String,
    required: true
  }
});
var HistoryPayment = mongoose.model("HistoryPayment", historyPaymentModel, 'history_payment');
module.exports = HistoryPayment;