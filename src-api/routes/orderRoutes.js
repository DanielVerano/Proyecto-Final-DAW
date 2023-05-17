const express = require('express');
const router = express.Router();

const { createPaymentIntent, createOrder, getAllOrders, getOrder, getUserOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { authenticateUser, authorizePermissions } = require('../middleware/auth');

router.route('/create-payment-intent')
  .post(createPaymentIntent);

router.route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllOrders)
  .post(authenticateUser, createOrder);

router.route('/myOrders')
  .get(authenticateUser, getUserOrders);

router.route('/:id')
  .get(authenticateUser, getOrder)
  .patch(authenticateUser, updateOrder)
  .delete([authenticateUser, authorizePermissions('admin')], deleteOrder);

module.exports = router;