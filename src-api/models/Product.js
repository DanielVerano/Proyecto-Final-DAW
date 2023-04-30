const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Introduzca el nombre del producto'],
    maxlength: 100
  },
  price: {
    type: Number,
    required: [true, 'Introduzca el precio del producto'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Introduzca la descripción del producto'],
    maxlength: 1000
  },
  image: {
    type: String,
    default: '/images/product-placeholder.jpg'
  },
  category: {
    type: String,
    required: [true, 'Introduzca la categoría del producto'],
    enum: ['smartphones']
  },
  stock: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Product', ProductSchema);