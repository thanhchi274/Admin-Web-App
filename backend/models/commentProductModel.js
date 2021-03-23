const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  rating:{
            type: String,
  },
  user_uid: {
    type: String,
  },
  createAt: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});
const Collections = mongoose.model("comment", commentSchema, "comment");

module.exports = Collections;
