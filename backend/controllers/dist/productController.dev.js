"use strict";

var ProductShop = require("../models/productModel.js");

var asyncHandler = require("express-async-handler");

var getProducts = asyncHandler(function _callee(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ProductShop.find({}));

        case 2:
          product = _context.sent;
          product ? res.status(200).json(product) : res.status(404).json({
            message: "Error when fetching data"
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
var getProductById = asyncHandler(function _callee2(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(ProductShop.findById(req.query.id));

        case 2:
          product = _context2.sent;
          product ? res.status(200).json(product) : res.status(404).json({
            error: "Not found the product"
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var getCategory = asyncHandler(function _callee3(req, res) {
  var categoryProduct;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(ProductShop.find({
            category: req.query.id
          }));

        case 2:
          categoryProduct = _context3.sent;
          categoryProduct ? res.status(200).json(categoryProduct) : res.status(404).json({
            error: "Not found the product"
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var getSales = asyncHandler(function _callee4(req, res) {
  var salesProduct;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(ProductShop.find({
            sale: true
          }));

        case 2:
          salesProduct = _context4.sent;
          salesProduct ? res.status(200).json(salesProduct) : res.status(404).json({
            error: "Not found the product"
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var createProduct = asyncHandler(function _callee5(req, res) {
  var createProduct;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(ProductShop.create(req.body));

        case 2:
          createProduct = _context5.sent;
          createProduct ? res.status(200).json(createProduct) : res.status(404).json({
            error: "Please check again"
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var updateProduct = asyncHandler(function _callee6(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(ProductShop.updateOne({
            _id: req.query.id
          }, req.body));

        case 2:
          product = _context6.sent;
          product ? res.status(200).json({
            message: "update the product successfully"
          }) : res.status(404).json({
            message: "Not found the product"
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
var updateProducts = asyncHandler(function _callee7(req, res) {
  var filter, condition, products;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          filter = req.body;
          condition = req.query;
          _context7.next = 4;
          return regeneratorRuntime.awrap(ProductShop.updateMany(condition, filter));

        case 4:
          products = _context7.sent;
          products ? res.status(200).json({
            message: "Update products successfully"
          }) : res.status(404).json({
            error: "Not found the product"
          });

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
var deleteProduct = asyncHandler(function _callee8(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(ProductShop.findByIdAndDelete(req.query.id));

        case 2:
          product = _context8.sent;
          product ? res.status(200).json({
            message: "Delete Successfully",
            product_id: req.query.id
          }) : res.status(404).json({
            error: "Not found the product"
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
var deleteProducts = asyncHandler(function _callee9(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(ProductShop.deleteMany({
            _id: req.query.id
          }));

        case 2:
          products = _context9.sent;
          products ? res.status(200).json(products) : res.status(404).json({
            error: "Not found the product"
          });

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
module.exports = {
  getProducts: getProducts,
  getProductById: getProductById,
  getCategory: getCategory,
  getSales: getSales,
  createProduct: createProduct,
  updateProduct: updateProduct,
  updateProducts: updateProducts,
  deleteProduct: deleteProduct,
  deleteProducts: deleteProducts
};