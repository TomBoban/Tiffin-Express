const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const {
  userRegisterCtrl,
  userLoginCtrl,
  updateUserInfoCtrl,
  getSingleUserCtrl,
} = require("../../controllers/user/userController");

const usersRoute = express.Router();

usersRoute.get("/:id", getSingleUserCtrl);
usersRoute.post("/register", userRegisterCtrl);
usersRoute.post("/login", userLoginCtrl);
usersRoute.put("/userInfo/:id", updateUserInfoCtrl);

module.exports = usersRoute;
