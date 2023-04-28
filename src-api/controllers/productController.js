const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json([...products]);
}

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) throw new Error(`No existe el producto con el id ${req.params.id}`);
  res.status(200).json(product);
}

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
  if (!product) throw new Error(`No existe el producto con el id ${req.params.id}`);
  res.status(200).json({ product });
}

const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });
  if (!product) throw new Error(`No existe el producto con el id ${req.params.id}`);
  res.status(200).json({ msg: 'Producto eliminado' });
}

module.exports = {
  getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct
}