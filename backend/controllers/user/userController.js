const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/UserModel");
const validateMongoDbId = require("../../utils/validateMongoID");
require("dotenv").config();

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const userExists = await User.findOne({
    email: req.body.email,
  });
  if (userExists) {
    throw new Error("User already exists");
  }
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  try {
    if (user && (await user.isPasswordMatched(password))) {
      res.json({
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        isAdmin: user?.isAdmin,
        role:user?.role,
        token: generateToken(user?._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//User info
const updateUserInfoCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const userUpdate = await User.findByIdAndUpdate(userId, {
      ...req.body,
      user: req.user?._id,
    });

    res.json(userUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get single Users
const getSingleUserCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  updateUserInfoCtrl,
  getSingleUserCtrl,
};
