const SubscriptionList = require("../models/subscriptionListModel");
const asyncHandler = require("express-async-handler");
var nodemailer = require("nodemailer");
const sendEmailCustomer = asyncHandler(async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chiptgcs18059@fpt.edu.vn",
      pass: "Diyeucuachi2001",
    },
  });
  console.log(req.query.email);
  var mailOptions = {
    from: "chiptgcs18059@fpt.edu.vn",
    to: req.query.email,
    subject: "Thanks for your subscription to Chi Clothing Store",
    html:
      `<b>Hey there! </b><br> Thanks a lot of your subscription, we hove you have a safe year<br /><img src="cid:uniq-new-subscription" />`,
    amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,
    attachments: [
      {
        filename: "aw_hey_email_liaa .png",
        path: "http://duwuwmeqrekb0.cloudfront.net/email_subscription.png",
        cid: "uniq-new-subscription",
      },
    ],
    list: {
      help: "admin@example.com?subject=help",
      unsubscribe: [
        {
          url: "http://example.com/unsubscribe",
          comment: "A short note about this url",
        },
        "unsubscribe@example.com",
      ],

      id: {
        url: "mylist.example.com",
        comment: "This is my awesome list",
      },
    },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(404).json({ message: error });
    } else {
      res.status(200).json({ message: info.response });
    }
  });
});
const sendMailAfterPayment = asyncHandler(async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chiptgcs18059@fpt.edu.vn",
      pass: "Diyeucuachi2001",
    },
  });
  var mailOptions = {
    from: "chiptgcs18059@fpt.edu.vn",
    to: req.query.email,
    subject: `Billing your transaction ${req.query.transactionId}`,
    html:
      '<b>Hey there! </b><br> Thanks a lot of your payment, we hove you have a safe year<br /><img src="cid:uniq-new-subscription" />',
    amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,
    attachments: [
      {
        filename: "aw_hey_email_liaa .png",
        path: "http://duwuwmeqrekb0.cloudfront.net/email_subscription.png",
        cid: "uniq-new-subscription",
      },
    ],
    list: {
      help: "admin@example.com?subject=help",
      unsubscribe: [
        {
          url: "http://example.com/unsubscribe",
          comment: "A short note about this url",
        },
        "unsubscribe@example.com",
      ],

      id: {
        url: "mylist.example.com",
        comment: "This is my awesome list",
      },
    },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(404).json({ message: error });
    } else {
      res.status(200).json({ message: info.response });
    }
  });
})
module.exports = {
  sendEmailCustomer,
};
