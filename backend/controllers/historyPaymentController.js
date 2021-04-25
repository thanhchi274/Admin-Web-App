const HistoryPayment = require("../models/historyPaymentModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
var _ = require("lodash");
const { filter } = require("lodash");
const getHistorySummary = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 2;
  const perPage = parseInt(req.query.perPage) || 30;
  let drop = (page - 1) * perPage;
  let d = new Date();
  const totalProduct = await Product.find({});
  const historyTransaction = await HistoryPayment.find();
  let currentMonthByNumber = d.getMonth() + 1;
  const totalMoneyAndSales = await HistoryPayment.aggregate([
    {
      $group: {
        _id: "null",
        TotalAmount: {
          $sum: {
            $toInt: "$amount",
          },
        },
        AverageValue: {
          $avg: {
            $toInt: "$amount",
          },
        },
        product: { $push: "$product" },
      },
    },
    { $unwind: "$product" },
    { $unwind: "$product" },
    {
      $group: {
        _id: "$_id",
        TotalAmount: { $first: "$TotalAmount" },
        AverageValue: { $first: "$AverageValue" },
        TotalQuantity: { $sum: "$product.quantity" },
      },
    },
  ]);
  const filterTransactionMonthly = await HistoryPayment.find({
    createAt: {
      $gte: `2021-0${currentMonthByNumber}-01 00:00:00`,
      $lt: `2021-0${currentMonthByNumber + 1}-01 00:00:00`,
    },
  });
  const filterTransactionPreviousMonth = await HistoryPayment.find({
    createAt: {
      $gte: `2021-0${
        currentMonthByNumber - 1 === 0 ? 12 : currentMonthByNumber - 1
      }-01 00:00:00`,
      $lt: `2021-0${currentMonthByNumber}-01 00:00:00`,
    },
  });
  function plusSalesPreviousMonth(n) {
    return parseInt(n.amount);
  }  function plusSalesMonth(n) {
    return parseInt(n.amount);
  }
 const mapPreviousMonthAmount =  _.map(filterTransactionPreviousMonth, plusSalesPreviousMonth)
 const mapThisMonthAmount =  _.map(filterTransactionMonthly, plusSalesMonth)
const totalPreviousMonth = _.reduce(mapPreviousMonthAmount, function(sum, n) {
    return sum + n;
  }, 0);
  const totalThisMonth = _.reduce(mapThisMonthAmount, function(sum, n) {
    return sum + n;
  }, 0);
  const result = {
    totalMoneyAndSales,
    filterTransactionMonthly,
    filterTransactionPreviousMonth,
    totalThisMonth,
    totalPreviousMonth,
    TotalProduct: totalProduct.length,
  };
  historyTransaction
    ? res.status(200).json(result)
    : res.status(404).json({ error: "Not found the product" });
});
const getHistoryTransactionsByID = asyncHandler(async (req, res) => {
  const historyTransaction = await HistoryPayment.find({
    userID: req.query.id,
  });
  historyTransaction
    ? res.status(200).json(historyTransaction)
    : res.status(404).json({ error: "Not found the product" });
});
module.exports = {
  getHistorySummary,
  getHistoryTransactionsByID,
};
