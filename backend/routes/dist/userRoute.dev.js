"use strict";

var _require = require("../controllers/userController.js"),
    getUsers = _require.getUsers,
    deleteUser = _require.deleteUser,
    updateUser = _require.updateUser,
    createUser = _require.createUser;

var express = require("express");

var router = express.Router(); //GET

router.get("/", getUsers);
router.get('/'); //POSt

router.post('/', createUser);
router.post('/history_payment'); //PUT

router.put('/', updateUser); //DELETE

router["delete"]('/', deleteUser);
module.exports = router;