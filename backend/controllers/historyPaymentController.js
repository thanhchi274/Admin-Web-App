const HistoryPayment =require( '../models/historyPaymentModel')
const asyncHandler =require('express-async-handler')
const getAllHistoryTransactions = asyncHandler(async (req, res) => {
          const historyTransaction = await HistoryPayment.find();
          historyTransaction
            ? res.status(200).json(historyTransaction)
            : res.status(404).json({ error: "Not found the product" });
});
const getHistoryTransactionsByID= asyncHandler(async (req, res) => {
  const historyTransaction = await HistoryPayment.find({userID:req.query.id});
  historyTransaction
            ? res.status(200).json(historyTransaction)
            : res.status(404).json({ error: "Not found the product" });
})
module.exports = {
  getAllHistoryTransactions,
  getHistoryTransactionsByID
        };