const ProductShop = require("../models/productModel.js");
const asyncHandler = require("express-async-handler");
var _ = require('lodash');
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page)||2;
  const perPage = 29;
  let drop =(page -1)*perPage
  const product = await ProductShop.find({});
  product
    ? res.status(200).json({..._(product).drop(drop).take(perPage).value(),"productLength":product.length})
    : res.status(404).json({ message: "Error when fetching data" });
});
const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductShop.findById(req.query.id);
  product
    ? res.status(200).json(product)
    : res.status(404).json({ error: "Not found the product" });
});
const getCategory = asyncHandler(async (req, res) => {
  const categoryProduct = await ProductShop.find({ category: req.query.id });
  categoryProduct
    ? res.status(200).json(categoryProduct)
    : res.status(404).json({ error: "Not found the product" });
});
const getSales = asyncHandler(async (req, res) => {
  const salesProduct = await ProductShop.find({ sale: true });
  salesProduct
    ? res.status(200).json(salesProduct)
    : res.status(404).json({ error: "Not found the product" });
});
const getRelatedItems = asyncHandler(async (req, res) => {
  const relatedProduct = await ProductShop.find({ tags : { $in : [req.query.tag] }});
  relatedProduct?res.status(200).json(relatedProduct) : res.status(404).json({ error: "Not found the product" });
})
const createProduct = asyncHandler(async (req, res) => {
  const createProduct = await ProductShop.create(req.body);
  createProduct
    ? res.status(200).json(createProduct)
    : res.status(404).json({ error: "Please check again" });
});
const updateProduct = asyncHandler(async (req, res) => {
  const product = await ProductShop.updateOne({ _id: req.query.id }, req.body);
  product
    ? res.status(200).json({ message: "update the product successfully" })
    : res.status(404).json({ message: "Not found the product" });
});
const updateProducts = asyncHandler(async (req, res) => {
  let filter = req.body;
  let condition = req.query;
  const products = await ProductShop.updateMany(condition, filter);
  products
    ? res.status(200).json({ message: "Update products successfully" })
    : res.status(404).json({ error: "Not found the product" });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductShop.findByIdAndDelete(req.query.id);
  product
    ? res
        .status(200)
        .json({ message: "Delete Successfully", product_id: req.query.id })
    : res.status(404).json({ error: "Not found the product" });
});
const deleteProducts = asyncHandler(async (req, res) => {
  const products = await ProductShop.deleteMany({ _id: req.query.id });
  products
    ? res.status(200).json(products)
    : res.status(404).json({ error: "Not found the product" });
});
module.exports = {
  getProducts,
  getProductById,
  getCategory,
  getSales,
  getRelatedItems,
  createProduct,
  updateProduct,
  updateProducts,
  deleteProduct,
  deleteProducts,
};
