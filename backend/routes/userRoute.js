const { getUsers, deleteUser,updateUser,createUser } = require("../controllers/userController.js");
const express = require("express");
const router = express.Router();
router.route('/').get(getUsers).post(createUser).patch(updateUser)
router.put('/reset_password')
//DELETE
router.delete('/',deleteUser)
router.delete('/deactivate')
module.exports = router;
