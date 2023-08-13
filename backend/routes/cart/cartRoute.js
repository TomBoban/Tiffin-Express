const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { getCartItems, addToCart, updateCartItemQuantity, removeFromCart, clearCart, decreaseToCart } = require("../../controllers/cart/cartController");


const cartRoute = express.Router();

cartRoute.get("/",authMiddleware, getCartItems);
cartRoute.post("/", authMiddleware, addToCart);
cartRoute.post("/substract", authMiddleware, decreaseToCart);
cartRoute.put("/:id", authMiddleware, updateCartItemQuantity);
cartRoute.delete("/clear", authMiddleware, clearCart);
cartRoute.delete("/:id", authMiddleware, removeFromCart);


module.exports = cartRoute;
