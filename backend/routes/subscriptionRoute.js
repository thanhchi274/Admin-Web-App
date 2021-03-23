const { sendEmailCustomer,sendMailAfterPayment} =require( "../controllers/subscriptionListController");
const express =require('express')
const router = express.Router()
router.post('/',sendEmailCustomer)
router.post('/sendMail_afterPayment',sendMailAfterPayment)
module.exports = router