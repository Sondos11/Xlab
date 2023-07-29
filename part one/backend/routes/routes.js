const express = require("express");
const router = express.Router();

var userController = require("../src/user/userController");


router.route("/user/create").post(userController.createUserControllerFn);

module.exports = router;