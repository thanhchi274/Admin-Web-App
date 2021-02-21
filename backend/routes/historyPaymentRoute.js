
const { getTest } =require( "../controllers/historyPaymentController");
const express =require('express')
const router = express.Router()
router.get("/:id",getTest)
router.post('/')
router.post('/transactions_filter')
router.get('/history_payments/:filter')
router.get('/user_payments')
router.get('/cancel_payments')
router.get('/current_payments')
router.get('/pdf_invoice')
module.exports = router