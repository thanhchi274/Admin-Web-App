const {createRequestContactFromUser,getRequestContactFromUser}  =require ('../controllers/userContactController.js')
const express = require("express");
const router = express.Router();
router.route('/').get(getRequestContactFromUser).post(createRequestContactFromUser)
module.exports = router;
