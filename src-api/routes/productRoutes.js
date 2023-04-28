const express = require('express');
const router = express.Router();

const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticateUser, authorizePermissions } = require('../middleware/auth');

router.route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct);

router.route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);

module.exports = router;