"use strict";

var express = require('express');

var router = express.Router();
router.use('/products', require('./productRoute'));
router.use('/users', require('./userRoute'));
router.use('/collections', require('./collectionRoutes'));
router.use('/payment', require('./paymentRoute'));
module.exports = router;