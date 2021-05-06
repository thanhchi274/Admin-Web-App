
const { getHistorySummary,getHistoryTransactionsByID ,getHistoryPaymentList,getHistoryPaymentLength,updateOnePayment} =require( "../controllers/historyPaymentController");
const express =require('express')
const router = express.Router()
router.get("/",getHistorySummary)
router.get('/:id',getHistoryTransactionsByID)
router.put('/update',updateOnePayment)
router.get('/all/history',getHistoryPaymentList)
router.get('/all/length',getHistoryPaymentLength)
router.get('/pdf_invoice')
module.exports = router