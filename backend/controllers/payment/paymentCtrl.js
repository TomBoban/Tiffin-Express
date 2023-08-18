const Payment = require("../../model/payment/paymentModel");
const Product = require("../../model/products/ProductModel");
const stripe = require("stripe")(
  "sk_test_51NapXvJXDHCrMxsTiMs1uX3PCo22LUcR2PLfOYlyWlAtDLG1IqwscoWFupLsE71iqr5cCQpvJGKmEIXpHUzspyLw00jm95qoTQ"
);
const asyncHandler = require("express-async-handler");

exports.createPayment = async (req, res) => {
  try {
    const { cart, total, token } = req.body;

    const { card } = token;
    const shippingAddress = {
      address1: card.address_line1,
      address2: card.address_line2,
      city: card.address_city,
      country: card.address_country,
      state: card.address_state,
      zip: card.address_zip,
    };

    const paymentPromises = cart.map(async (cartItem) => {
      const product = await Product.findById(cartItem.product._id);

      try {
        const charge = await stripe.charges.create({
          amount: cartItem.product.price * cartItem.quantity * 100,
          currency: "usd",
          receipt_email: token.email,
          source: token.id,
          description: `Payment for ${cartItem.quantity} ${cartItem.product.name}(s) from eShop`,
        });

        if (charge && charge.status === "succeeded") {
          const authorization = {
            ...charge.payment_method_details,
            receipt: charge.receipt_url,
            token: token.id,
          };

          const paymentProduct = cart.map((item) => ({
            _id: item.product._id,
          }));

          const context = {
            authorization,
            user: req.user.id,
            cartId: cartItem._id,
            reference: charge.id,
            transaction: charge.balance_transaction,
            shippingAddress,
            totalAmount: req.body.total,
            isSubscribed: true,
            product: paymentProduct,
          };

          const payment = new Payment(context);
          await payment.save();
        }
      } catch (err) {
        console.error(err);
      }
    });

    await Promise.all(paymentPromises);

    res.send({ status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//@access: public

exports.getPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("user")
      .populate("product")
      .populate({
        path: "product",
        populate: { path: "user" }, // Populate the "user" field inside each product
      })
      .exec();

    if (payments) {
      res.json(payments);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error, "Error");
    res.status(500).json({ message: "Failed to get payments" });
  }
});

//delete single comment
exports.deletePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Payment.findByIdAndDelete(id);

    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});
