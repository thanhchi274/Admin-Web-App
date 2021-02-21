const { sendEmailCustomer} =require( "../controllers/subscriptionListController");
const express =require('express')
const router = express.Router()
router.post('/',sendEmailCustomer)
router.post('/email_verified')
router.post('/unsubscribe')
router.post('/change_settings_subscribe')
module.exports = router