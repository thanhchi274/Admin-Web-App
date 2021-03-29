
const { getHistorySummary,getHistoryTransactionsByID } =require( "../controllers/historyPaymentController");
const express =require('express')
const router = express.Router()
router.get("/",getHistorySummary)
router.get('/:id',getHistoryTransactionsByID)
router.get('/pdf_invoice')
module.exports = router