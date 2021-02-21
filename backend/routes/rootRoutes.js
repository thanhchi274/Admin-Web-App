const express =require( 'express');
const router = express.Router()
router.use('/products', require('./productRoute'))
router.use('/users', require('./userRoute'))
router.use('/collections',require('./collectionRoutes'))
router.use('/payment', require('./paymentRoute'))
router.use('/transactions',require('./historyPaymentRoute'))
router.use('/notify_email', require('./subscriptionRoute'))
router.use('/contact_us', require('./userContactRoute'))
module.exports = router