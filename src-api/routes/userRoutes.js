const express = require('express');
const router = express.Router();

const { getAllUsers, getSingleUser, updateUser, updateUserPassword, deleteUser } = require('../controllers/userController');
const { authenticateUser, authorizePermissions } = require('../middleware/auth');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, updateUserPassword);
router.route('/deleteUser').delete(authenticateUser, authorizePermissions('admin'), deleteUser);
router.route('/:id')
  .get(authenticateUser, getSingleUser)
  .delete(authenticateUser, authorizePermissions('admin'), deleteUser);

module.exports = router;
