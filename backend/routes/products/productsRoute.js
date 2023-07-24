const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
} = require("../../controllers/products/productController");
const authMiddleware = require("../../middleware/authMiddleware");
const upload = require("../../middleware/multer");

const productsRoute = express.Router();

productsRoute.get("/", getAllProducts);
productsRoute.get("/:id", getSingleProduct);
productsRoute.post("/", authMiddleware,upload.single("image"), createProduct);
productsRoute.put("/:id", authMiddleware, updateProduct);

module.exports = productsRoute;
