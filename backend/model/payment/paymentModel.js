const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Product",
    },
    cartId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    transaction: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    authorization: JSON,
    shippingAddress: JSON,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
