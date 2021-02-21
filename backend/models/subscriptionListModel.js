const mongoose = require("mongoose");
const SubscriptionListModel = mongoose.Schema({
  user_model: {
    type: String,
  },
  createAt: {
    type: String,
  },
});
const SubscriptionList = mongoose.model(
  "subscriptionList",
  SubscriptionListModel,
  "subscriptionList"
);
module.exports = SubscriptionList;
