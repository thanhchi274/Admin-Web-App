"use strict";

var _require = require("../controllers/productController.js"),
    getProducts = _require.getProducts,
    getProductById = _require.getProductById,
    getCategory = _require.getCategory,
    getSales = _require.getSales,
    deleteProduct = _require.deleteProduct,
    deleteProducts = _require.deleteProducts,
    updateProduct = _require.updateProduct,
    updateProducts = _require.updateProducts,
    createProduct = _require.createProduct;

var express = require('express');

var router = express.Router(); //GET

router.get("/", getProducts);
router.get('/item', getProductById);
router.get('/category', getCategory);
router.get('/sales', getSales); //POSt

router.post('/create_product', createProduct); // //PUT

router.put('/updateProduct', updateProduct);
router.put('/updateProducts', updateProducts); // router.put('/',updateUser)
// //DELETE

router["delete"]('/delete_item', deleteProduct);
router["delete"]('/delete_items', deleteProducts);
module.exports = router;