const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../../controllers/products/productController");
const authMiddleware = require("../../middleware/authMiddleware");

const productsRoute = express.Router();

productsRoute.get("/", getAllProducts);
productsRoute.post("/", authMiddleware, createProduct);

module.exports = productsRoute;
