const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require("../../controllers/products/productController");
const authMiddleware = require("../../middleware/authMiddleware");

const productsRoute = express.Router();

productsRoute.get("/", getAllProducts);
productsRoute.post("/", authMiddleware, createProduct);
productsRoute.put("/:id", authMiddleware, updateProduct);

module.exports = productsRoute;
