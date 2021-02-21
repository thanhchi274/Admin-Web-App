const Collections = require("../models/collectionModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const getCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params;
    const item = await Collections.findById(collectionId).populate('items')
    item? res.status(200).json(item):res.status(404).json({ error: "Not found the product" });
});
const getCollectionbyId = asyncHandler(async (req, res) => {
  const collection = await Collections.find({ routeName: req.params.product });
  if (collection) {
    res.json(collection);
  } else {
    res.status(404).json({ message: "collection not found" });
    res.status(404);
    throw new Error("collection not found");
  }
});
const test = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const newProduct = new Product(req.body);
  const collections = await Collections.findById(collectionId);
  newProduct.collection = collections;
  await newProduct.save();
  collections.items.push(newProduct._id);
  await collections.save();
  res.status(201).json({newProduct:newProduct});
});
module.exports = { getCollection, getCollectionbyId, test };
