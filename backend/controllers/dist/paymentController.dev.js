"use strict";

var asyncHandler = require("express-async-handler");

var crypto = require("crypto");

var _require = require("uuid"),
    uuidv1 = _require.v1;

var https = require("https");

var _require2 = require("axios"),
    axios = _require2["default"];

var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

var StripePayment = asyncHandler(function _callee(req, res) {
  var body;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = {
            source: req.body.token.id,
            amount: req.body.amount,
            currency: "usd"
          };
          stripe.charges.create(body, function (stripeErr, stripeRes) {
            if (stripeErr) {
              res.status(500).send({
                error: stripeErr
              });
            } else {
              res.status(200).send({
                success: stripeRes
              });
            }
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
var MoMoPayment = asyncHandler(function _callee2(momoReq, momoRes) {
  var requestId, orderId, returnUrl, notifyUrl, extraData, requestType, _momoReq$body, amount, orderInfo, rawSignature, signature, body, options, savedResult, req, displaySavedResult;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          displaySavedResult = function _ref() {
            if (!savedResult) {
              console.log("Last result is null!");
            } else {
              momoRes.status(200).json(savedResult);
            }
          };

          requestId = uuidv1();
          orderId = uuidv1();
          returnUrl = "https://google.com.vn";
          notifyUrl = "https://callback.url/notify";
          extraData = "merchantName=;merchantId=";
          requestType = "captureMoMoWallet";
          _momoReq$body = momoReq.body, amount = _momoReq$body.amount, orderInfo = _momoReq$body.orderInfo;
          rawSignature = "partnerCode=" + process.env.MOMO_PARTNER_CODE + "&accessKey=" + process.env.MOMO_ACCESS_KEY + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyUrl + "&extraData=" + extraData;
          signature = crypto.createHmac("sha256", process.env.MOMO_SECRET_KEY).update(rawSignature).digest("hex");
          body = JSON.stringify({
            partnerCode: process.env.MOMO_PARTNER_CODE,
            accessKey: process.env.MOMO_ACCESS_KEY,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature
          });
          options = {
            hostname: "test-payment.momo.vn",
            port: 443,
            path: "/gw_payment/transactionProcessor",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(body)
            }
          };
          savedResult = null;
          req = https.request(options, function (res) {
            var jsonData = "";
            console.log("Status: ".concat(res.statusCode));
            res.setEncoding("utf8");
            res.on("data", function (body) {
              jsonData += body;
            }, function () {
              return console.log("12");
            });
            res.on("end", function () {
              savedResult = JSON.parse(jsonData);
              console.log("No more data in response.");
            });
          });
          req.on("error", function (e) {
            console.log("problem with request: ".concat(e.message));
          });
          req.write(body);
          req.end();
          setTimeout(displaySavedResult, 1000);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = {
  StripePayment: StripePayment,
  MoMoPayment: MoMoPayment
};