const {StripePayment,MoMoPayment,NotifyURLMOMO} = require("../controllers/paymentController.js")
const express =require('express')
const router = express.Router()
router.post('/stripe',StripePayment)
router.post('/momo',MoMoPayment)
router.post('/notifyurl',NotifyURLMOMO)
module.exports = router