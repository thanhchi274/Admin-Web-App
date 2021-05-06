const HistoryPayment = require("../models/historyPaymentModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
var _ = require("lodash");
const getHistorySummary = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 2;
  const perPage = 6;
  let drop = (page - 1) * perPage;
  let d = new Date();
  const totalProduct = await Product.find({});
  const NikeProduct =await (await Product.find({"tags":"Nike"}))
  const lengthNikeProduct = NikeProduct.length
  const AdidasProduct =await (await Product.find({"tags":"Adidas"}))
  const lengthAdidasProduct = AdidasProduct.length
  const LVProduct =await (await Product.find({"tags":"Louis Vuiton"}))
  const lengthLVProduct = LVProduct.length
  const GucciProduct =await (await Product.find({"tags":"Gucci"}))
  const lengthGucciProduct = GucciProduct.length
  const historyTransaction = await HistoryPayment.find({});
  let currentMonthByNumber = d.getMonth() + 1;
  let previousYearByNumber = d.getUTCFullYear() - 1
  let currentYearByNumber = d.getUTCFullYear()
  const latestTransactions =  _(historyTransaction).drop(drop).take(perPage).value()
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
  const filterTransactionPreviousYearly = await HistoryPayment.find({
    createAt: {
      $gte: `${previousYearByNumber}-01-01 00:00:00`,
      $lt: `${currentYearByNumber}-01-01 00:00:00`,
    },
  })
  const filterTransactionCurrentYearly = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-01-01 00:00:00`,
      $lt: `${currentYearByNumber+1}-01-01 00:00:00`,
    },
  })
  const filterTransactionPreviousMonth = await HistoryPayment.find({
    createAt: {
      $gte: `2021-0${
        currentMonthByNumber - 1 === 0 ? 12 : currentMonthByNumber - 1
      }-01 00:00:00`,
      $lt: `2021-0${currentMonthByNumber}-01 00:00:00`,
    },
  });
  const filterTransactionJan = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-01-01 00:00:00`,
      $lt: `${currentYearByNumber}-02-01 00:00:00`,
    },
  })
  let JanNumberPayment = filterTransactionJan.length
  const filterTransactionFeb = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-02-01 00:00:00`,
      $lt: `${currentYearByNumber}-03-01 00:00:00`,
    },
  })
  let FebNumberPayment = filterTransactionFeb.length
  const filterTransactionMarch = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-03-01 00:00:00`,
      $lt: `${currentYearByNumber}-04-01 00:00:00`,
    },
  })
  let MarchNumberPayment = filterTransactionMarch.length
  const filterTransactionApril = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-04-01 00:00:00`,
      $lt: `${currentYearByNumber}-05-01 00:00:00`,
    },
  })
  let AprilNumberPayment = filterTransactionApril.length
  const filterTransactionMay = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-05-01 00:00:00`,
      $lt: `${currentYearByNumber}-06-01 00:00:00`,
    },
  })
  let MayNumberPayment = filterTransactionMay.length
  const filterTransactionJune = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-06-01 00:00:00`,
      $lt: `${currentYearByNumber}-07-01 00:00:00`,
    },
  })
  let JuneNumberPayment = filterTransactionJune.length
  const filterTransactionJuly = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-07-01 00:00:00`,
      $lt: `${currentYearByNumber}-08-01 00:00:00`,
    },
  })
  let JulyNumberPayment = filterTransactionJuly.length
  const filterTransactionAug = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-08-01 00:00:00`,
      $lt: `${currentYearByNumber}-09-01 00:00:00`,
    },
  })
  let AugNumberPayment = filterTransactionAug.length
  const filterTransactionSep = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-09-01 00:00:00`,
      $lt: `${currentYearByNumber}-10-01 00:00:00`,
    },
  })
  let SepNumberPayment = filterTransactionSep.length
  const filterTransactionOctober = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-10-01 00:00:00`,
      $lt: `${currentYearByNumber}-11-01 00:00:00`,
    },
  })
  let OctoberNumberPayment = filterTransactionOctober.length
  const filterTransactionNovember = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-11-01 00:00:00`,
      $lt: `${currentYearByNumber}-12-01 00:00:00`,
    },
  })
  let NovNumberPayment = filterTransactionNovember.length
  const filterTransactionDec = await HistoryPayment.find({
    createAt: {
      $gte: `${currentYearByNumber}-12-01 00:00:00`,
      $lt: `${currentYearByNumber+1}-01-01 00:00:00`,
    },
  })
  let DecNumberPayment = filterTransactionDec.length
  let MonthlyNumberPayment = [JanNumberPayment,FebNumberPayment,MarchNumberPayment,AprilNumberPayment,MayNumberPayment,JuneNumberPayment,JulyNumberPayment,AugNumberPayment,SepNumberPayment,OctoberNumberPayment, NovNumberPayment,DecNumberPayment]
  function plusSalesPreviousMonth(n) {
    return parseInt(n.amount);
  }  function plusSalesMonth(n) {
    return parseInt(n.amount);
  }
  function plusYearAmount(n){
    return parseInt(n.amount);
  }
 const mapPreviousMonthAmount =  _.map(filterTransactionPreviousMonth, plusSalesPreviousMonth)
 const mapThisMonthAmount =  _.map(filterTransactionMonthly, plusSalesMonth)
 const mapCurrentYearAmount =  _.map(filterTransactionCurrentYearly,plusYearAmount )
 const mapPreviousYearAmount = _.map(filterTransactionPreviousYearly, plusYearAmount)
const totalPreviousMonth = _.reduce(mapPreviousMonthAmount, function(sum, n) {
    return sum + n;
  }, 0);
  const totalThisMonth = _.reduce(mapThisMonthAmount, function(sum, n) {
    return sum + n;
  }, 0);
  const totalPreviousYear = _.reduce(mapPreviousYearAmount, function(sum,n){
    return sum +n
  })
  const totalCurrentYear = _.reduce(mapCurrentYearAmount, function(sum,n){
    return sum +n
  })
  const result = {
    totalMoneyAndSales,
    filterTransactionMonthly,
    filterTransactionPreviousMonth,
    totalThisMonth,
    totalPreviousYear,
    totalCurrentYear,
    latestTransactions,
    lengthGucciProduct,
    lengthNikeProduct,
    lengthLVProduct,
    lengthAdidasProduct,
    totalPreviousMonth,
    MonthlyNumberPayment,
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
const getHistoryPaymentList = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 2;
  const perPage = parseInt(req.query.perPage)|| 10;
  let drop = (page - 1) * perPage;
  const historyTransaction = await HistoryPayment.find({});
  historyTransaction
  ? res.status(200).json(_(historyTransaction).drop(drop).take(perPage).value())
  : res.status(404).json({ error: "Not found the transactions" });
})
const getHistoryPaymentLength =  asyncHandler(async (req, res) => {
  const historyTransaction = await HistoryPayment.find({});
  historyTransaction
  ? res.status(200).json({length:historyTransaction.length})
  : res.status(404).json({ error: "Not found the transactions" });
})
const updateOnePayment = asyncHandler(async (req, res) => {
  const historyTransaction = await HistoryPayment.updateOne({ _id: req.query.id }, req.body);
  historyTransaction
    ? res.status(200).json({ message: "update the product successfully" })
    : res.status(404).json({ message: "Not found the product" });
});
module.exports = {
  getHistorySummary,
  updateOnePayment,
  getHistoryTransactionsByID,
  getHistoryPaymentList,getHistoryPaymentLength
};
