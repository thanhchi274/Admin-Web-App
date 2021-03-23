
const { getAllHistoryTransactions,getHistoryTransactionsByID } =require( "../controllers/historyPaymentController");
const express =require('express')
const router = express.Router()
router.get("/",getAllHistoryTransactions)
router.get('/:id',getHistoryTransactionsByID)
router.get('/pdf_invoice')
module.exports = router