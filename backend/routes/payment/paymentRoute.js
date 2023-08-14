const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");

const { createPayment, getPayments, deletePayment } = require("../../controllers/payment/paymentCtrl");
const paymentRoute = express.Router();


paymentRoute.get("/", authMiddleware,getPayments)
paymentRoute.post("/", authMiddleware,createPayment)
paymentRoute.delete("/:id", deletePayment );


module.exports = paymentRoute;
