const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
} = require("../../controllers/products/productController");
const authMiddleware = require("../../middleware/authMiddleware");

const productsRoute = express.Router();

productsRoute.get("/", getAllProducts);
productsRoute.get("/:id", getSingleProduct);
productsRoute.post("/", authMiddleware, createProduct);
productsRoute.put("/:id", authMiddleware, updateProduct);

module.exports = productsRoute;
