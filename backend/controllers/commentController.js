const Comment = require("../models/commentProductModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const getComment = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const item = await Comment.findById(collectionId).populate('items')
    item? res.status(200).json(item):res.status(404).json({ error: "Not found the product" });
});
const getCommentById = asyncHandler(async (req, res) => {
  const collection = await Comment.find({ routeName: req.params.product });
  if (collection) {
    res.json(collection);
  } else {
    res.status(404).json({ message: "collection not found" });
    res.status(404);
    throw new Error("collection not found");
  }
});
module.exports = { getComment, getCommentById };
