const ContactFormModel = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
var _ = require('lodash');
const getRequestContactFromUser = asyncHandler(async (req, res) => {
  const requestUsers = await ContactFormModel.find()
  requestUsers ? res.status(200).json(requestUsers) : res.status(404).json({error:'Not found the request'})
})
const createRequestContactFromUser = asyncHandler(async (req, res) => {
          const contactRequest =await ContactFormModel.create(req.body)
          contactRequest ? res.status(200).json('We will contact you soon as we can'):
          res.status(403).json({error:"Please Check Again Request"})
})

module.exports = {
  createRequestContactFromUser,
  getRequestContactFromUser
        };