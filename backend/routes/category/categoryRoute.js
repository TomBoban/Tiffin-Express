const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");

const {
  createCategory,
  getAllCategories,
} = require("../../controllers/category/categoryController");

const categoryRoute = express.Router();

categoryRoute.get("/", getAllCategories);
categoryRoute.post("/", authMiddleware, createCategory);

module.exports = categoryRoute;
