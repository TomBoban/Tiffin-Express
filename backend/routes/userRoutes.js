const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  userRegisterCtrl,
  userLoginCtrl,
} = require("../controllers/user/userController");

const usersRoute = express.Router();

usersRoute.post("/register", userRegisterCtrl);
usersRoute.post("/login", userLoginCtrl);

module.exports = usersRoute;
