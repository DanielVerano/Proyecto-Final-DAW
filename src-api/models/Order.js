const mongoose = require('mongoose');

const SingleItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  amount: { type: String, required: true },
  image: { type: String, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true
  }
})

const OrderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'fallado', 'pagado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  cartItems: [SingleItemSchema],
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);