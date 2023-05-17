const stripe = require('stripe')(process.env.STRIPE_KEY);
const Order = require('../models/Order');
const Product = require('../models/Product');
const { checkPermissions } = require('../utils');

const calculateOrderAmount = async (items, shipping_fee) => {
  let totalAmount = await items.reduce(async (total, item) => {
    const { id, amount } = item;
    const product = await Product.findOne({ _id: id });
    total += product.price * amount;
    return total;
  }, 0);

  return totalAmount + shipping_fee;
}

const createPaymentIntent = async (req, res) => {
  const { cart, total_amount, shipping_fee } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(cart, shipping_fee),
    currency: 'eur'
  });

  res.json({ clientSecret: paymentIntent.client_secret });
}

const createOrder = async (req, res) => {
  const { cart, total_amount, shipping_fee, client_secret } = req.body;

  if (!cart || cart.length < 1) throw new Error('No existe un carrito de la compra');

  let cartItems = [];
  let total = 0;

  for (const item of cart) {
    const product = await Product.findOne({ _id: item.id });
    const { _id, name, price, image } = product;

    if (!product) throw new Error(`No existe un producto con id ${id}`);

    const singleItem = {
      name,
      price,
      amount: item.amount,
      image,
      product: _id
    }

    cartItems = [...cartItems, singleItem];
    total += price * item.amount;
  }

  total += shipping_fee;

  const order = await Order.create({
    total,
    cartItems,
    user: req.user.userId,
    clientSecret: client_secret
  });

  res.status(201).json(order);
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json(orders);
}

const getOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) throw new Error(`No existe un pedido con la id ${orderId}`);

  checkPermissions(req.user, order.user);

  res.status(200).json(order);
}

const getUserOrders = async (req, res) => {
  const userOrders = await Order.find({ user: req.user.userId });
  res.status(200).json(userOrders);
}

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) throw new Error(`No existe un pedido con la id ${orderId}`);

  checkPermissions(req.user, order.user);

  order.status = 'pagado';
  await order.save();

  res.status(200).json(order);
}

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOneAndDelete({ _id: orderId });
  res.status(200).json({ msg: 'pedido eliminado' });
}

module.exports = { createPaymentIntent, createOrder, getAllOrders, getOrder, getUserOrders, updateOrder, deleteOrder }