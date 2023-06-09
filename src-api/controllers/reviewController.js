const Review = require('../models/Review');
const Product = require('../models/Product');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const productExists = await Product.findOne({ _id: productId });
  if (!productExists) throw new Error(`No existe el producto con id ${productId}`);

  const reviewExists = await Review.findOne({ product: productId, user: req.user.userId });
  if (reviewExists) throw new Error('Ya existe una reseña para este producto');

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(201).json({ review });
}

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(200).json(reviews);
}

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id });
  if (!review) throw new Error(`No existe la reseña con id ${req.params.id}`);
  res.status(200).json(review);
}

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  let review = await Review.findOne({ _id: reviewId });
  if (!review) throw new Error(`No existe la reseña con id ${req.params.id}`);

  checkPermissions(req.user, review.user);
  review = await Review.findOneAndUpdate({ _id: reviewId }, { rating, title, comment }, { new: true, runValidators: true });

  res.status(200).json(review);
}

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) throw new Error(`No existe la reseña con id ${req.params.id}`);

  checkPermissions(req.user, review.user);
  await Review.findOneAndDelete({ _id: reviewId });

  res.status(200).json({ msg: 'Reseña eliminada' });
}

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(200).json(reviews);
}

module.exports = {
  createReview, getAllReviews, getSingleReview, updateReview, deleteReview, getSingleProductReviews
}