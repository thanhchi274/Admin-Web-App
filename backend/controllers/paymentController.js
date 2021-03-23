const asyncHandler = require("express-async-handler");
const HistoryPayment = require("../models/historyPaymentModel");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const https = require("https");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var _ = require('lodash');
let MomoHandleItems = []
let MoMoUserId = []
let populateMoMoItems = data=>{
  MomoHandleItems.push(data);
}
let populateMoMoUserID = data=>{
  MoMoUserId.push(data);
}
const StripePayment = asyncHandler(async (req, res) => {
  const body = {
    payment_method: req.body.token,
    amount: req.body.amount,
    currency: "usd",
    confirm: true,
    payment_method_types: ["card"],
    shipping: {
      name: req.body.shippingData.first_name,
      phone: req.body.shippingData.phone,
      address: {
        line1: req.body.shippingData.address,
      },
    },
  };
  stripe.paymentIntents.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({
        error: stripeErr,
      });
    } else {
      let {id, amount,client_secret,created, currency, status}= stripeRes
      const historyPayment = {
        transactions_id: id,
        createAt:created,
        userID:req.body.userID,
        status:"prepare",
        product:req.body.items,
        client_secret,
        payment_status:status,
        currency,
        amount,
      };
      const createHistoryPayment = HistoryPayment.create(historyPayment);
      createHistoryPayment
        ?   res.status(200).send({ success: stripeRes })
        : res.status(404).json({ error: "Please check again" });
    }
  });
});
const NotifyURLMOMO = asyncHandler(async (req, res) => {
  let productItems = _.flatten(_.map(MomoHandleItems));
  let {signature, amount, message,responseTime,transId}= req.body
  const historyPayment = {
    transactions_id: transId,
    createAt:responseTime,
    userID:MoMoUserId[0],
    status:"prepare",
    product:productItems,
    client_secret:signature,
    payment_status:message,
    currency:'VN',
    amount,
  };
  const createHistoryPayment = HistoryPayment.create(historyPayment);
  createHistoryPayment
    ?   res.status(200).send({ success: historyPayment })
    : res.status(404).json({ error: "Please check again" });
});
const MoMoPayment = asyncHandler(async (momoReq, momoRes) => {
  let requestId = uuidv1();
  let orderId = uuidv1();
  let returnUrl = `https://thanhchishop.com/payment-success/${orderId}`;
  let notifyUrl = "https://thanhchishop.com/api/payment/notifyurl";
  let extraData = "merchantName=;merchantId=";
  let requestType = "captureMoMoWallet";
  const { amount, orderInfo,items,userID } = momoReq.body;
  populateMoMoItems(items)
  populateMoMoUserID(userID)
  let rawSignature =
    "partnerCode=" +
    process.env.MOMO_PARTNER_CODE +
    "&accessKey=" +
    process.env.MOMO_ACCESS_KEY +
    "&requestId=" +
    requestId +
    "&amount=" +
    amount +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&returnUrl=" +
    returnUrl +
    "&notifyUrl=" +
    notifyUrl +
    "&extraData=" +
    extraData;
  let signature = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY)
    .update(rawSignature)
    .digest("hex");
  const body = JSON.stringify({
    partnerCode: process.env.MOMO_PARTNER_CODE,
    accessKey: process.env.MOMO_ACCESS_KEY,
    requestId,
    amount,
    orderId,
    orderInfo,
    returnUrl,
    notifyUrl,
    extraData,
    requestType,
    signature,
  });
  var options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/gw_payment/transactionProcessor",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };
  var savedResult = null;
  var req = https.request(options, (res) => {
    var jsonData = "";
    res.setEncoding("utf8");
    res.on(
      "data",
      (body) => {
        jsonData += body;
      },
      () => console.log("12")
    );
    res.on("end", () => {
      savedResult = JSON.parse(jsonData);
    });
  });
  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(body);
  req.end();
  setTimeout(displaySavedResult, 1000);
  function displaySavedResult() {
    if (!savedResult) {
      console.log("Last result is null!");
    } else {
      // console.log(savedResult)
      momoRes.status(200).json(savedResult);
    }
  }
});
module.exports = {
  StripePayment,
  MoMoPayment,
  NotifyURLMOMO,
};
