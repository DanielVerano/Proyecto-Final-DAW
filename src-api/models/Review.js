const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Introduzca una valoración']
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100,
    required: [true, 'Introduzca un título']
  },
  comment: {
    type: String,
    required: [true, 'Introduzca un comentario']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  }
}, { timestamps: true });

// 1 Usuario => 1 Valoración por producto
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);