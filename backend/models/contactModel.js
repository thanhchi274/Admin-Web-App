const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSupportModel = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  status: {
    type:String,
    required: true
  }
})
const Collections = mongoose.model(
  "contactSupport",
  contactSupportModel,
  "contactSupport"
);

module.exports = Collections;
