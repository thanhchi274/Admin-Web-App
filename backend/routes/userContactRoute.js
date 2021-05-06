const {createRequestContactFromUser,getRequestContactFromUser,updateRequest,createInvoicePDF}  =require ('../controllers/userContactController.js')
const express = require("express");
const router = express.Router();
router.route('/').get(getRequestContactFromUser).post(createRequestContactFromUser).put(updateRequest)
router.get('/invoice_pdf',createInvoicePDF)
module.exports = router;
