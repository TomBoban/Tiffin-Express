const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");

const { createPayment, getPayments } = require("../../controllers/payment/paymentCtrl");
const paymentRoute = express.Router();


paymentRoute.get("/", authMiddleware,getPayments)
paymentRoute.post("/", authMiddleware,createPayment)


module.exports = paymentRoute;
