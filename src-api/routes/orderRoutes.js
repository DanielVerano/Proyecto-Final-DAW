const express = require('express');
const router = express.Router();

const { createPaymentIntent } = require('../controllers/orderController');

router.route('/create-payment-intent').post(createPaymentIntent);

module.exports = router;