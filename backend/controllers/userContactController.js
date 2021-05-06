const ContactFormModel = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const easyinvoice = require('easyinvoice');
var fs = require('fs');
var _ = require('lodash');
const getRequestContactFromUser = asyncHandler(async (req, res) => {
  const requestUsers = await ContactFormModel.find()
  requestUsers ? res.status(200).json(requestUsers) : res.status(404).json({error:'Not found the request'})
})
const updateRequest = asyncHandler(async (req, res) => {
  const request = await ContactFormModel.updateOne({ _id: req.query.id }, req.body);
  request
    ? res.status(200).json({ message: "update the product successfully" })
    : res.status(404).json({ message: "Not found the product" });
});
const createRequestContactFromUser = asyncHandler(async (req, res) => {
          const contactRequest =await ContactFormModel.create(req.body)
          contactRequest ? res.status(200).json('We will contact you soon as we can'):
          res.status(403).json({error:"Please Check Again Request"})
})
const createInvoicePDF = asyncHandler(async (req, res) => {
  var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "USD",
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2020.0001",
    "invoiceDate": "05-01-2020",
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax": 21,
            "price": 10.45
        }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days."
};
easyinvoice.createInvoice(data, function (result) {
    easyinvoice.download('myInvoice.pdf', result.pdf);
    console.log(result.pdf);
});
})
module.exports = {
  createRequestContactFromUser,
  updateRequest,
  createInvoicePDF,
  getRequestContactFromUser
        };