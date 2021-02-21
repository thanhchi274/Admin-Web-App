"use strict";

var _require = require("../controllers/paymentController.js"),
    StripePayment = _require.StripePayment,
    MoMoPayment = _require.MoMoPayment;

var express = require('express');

var router = express.Router();
router.post('/stripe', StripePayment);
router.post('/momo', MoMoPayment);
module.exports = router;