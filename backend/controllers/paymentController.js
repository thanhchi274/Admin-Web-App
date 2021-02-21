const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const https = require("https");
const { default: axios } = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const StripePayment = asyncHandler(async (req, res) => {
  const body = {
    payment_method: req.body.token,
    amount: req.body.amount,
    currency: "usd",
    confirm:true,
    payment_method_types:['card'],
    metadata:{id:"PG4G68cfq3VNLlx7eDmXZ3vxDJs1"},
    shipping:{
      name:'Thanh Chi',
      phone:'84901208206',
      address:{
        city:"Ho Chi Minh city",
        state:"Viet Nam",
        line1:'Viet Nam',
        postal_code:'71114'
      }
    }
  };
  // const customer = await stripe.customers.create({
  //   description: 'My First Test Customer (created for API docs)',
  // },(stripeErr,stripeRes)=>{
  //   if(stripeErr){
  //     console.log(stripeErr)
  //     res.status(500).send({
  //             error: stripeErr,
  //           });
  //   }
  //   else {
  //         res.status(200).send({ success: stripeRes });
  //       }
  // });
  stripe.paymentIntents.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      console.log(stripeErr)
      res.status(500).send({
        error: stripeErr,
      });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
const NotifyURLMOMO =asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.params)
  console.log(req.query)
})
const MoMoPayment = asyncHandler(async (momoReq, momoRes) => {
  let requestId = uuidv1();
  let orderId = uuidv1();
  let returnUrl = "https://clothing-backend-gakso.ondigitalocean.app/api/payment/notifyurl";
  let notifyUrl = "https://callback.url/notify";
  let extraData = "merchantName=;merchantId=";
  let requestType = "captureMoMoWallet";
  const { amount, orderInfo } = momoReq.body;
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
    console.log(`Status: ${res.statusCode}`);
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
      console.log("No more data in response.");
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
      momoRes.status(200).json(savedResult);
    }
  }
});
module.exports = {
  StripePayment,
  MoMoPayment,
  NotifyURLMOMO,
};
