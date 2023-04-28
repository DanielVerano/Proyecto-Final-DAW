const stripe = require('stripe')(process.env.STRIPE_KEY);
const Product = require('../models/Product');

const createPaymentIntent = async (req, res) => {
  const { cart, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = async (items) => {
    let totalAmount = await items.reduce(async (total, item) => {
      const { id, amount } = item;
      const product = await Product.findOne({ _id: id });
      total += product.price * amount;
      return total;
    }, 0);

    return totalAmount + shipping_fee;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(cart),
    currency: 'eur'
  });

  res.json({ clientSecret: paymentIntent.client_secret });
}

module.exports = { createPaymentIntent }