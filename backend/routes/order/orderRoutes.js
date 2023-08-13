const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered } = require("../../controllers/orders/orderController");

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, addOrderItems);
orderRouter.get("/", authMiddleware, getAllOrders);
orderRouter.get("/myorders", authMiddleware, getMyOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);
orderRouter.put("/:id/pay", authMiddleware, updateOrderToPaid);
orderRouter.put("/:id/deliver", authMiddleware, updateOrderToDelivered);

module.exports = orderRouter;
