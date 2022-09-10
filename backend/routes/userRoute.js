import express from 'express';
import {
  changePassword,
  createUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logout,
  updateuserByAdmin,
  updateUserDetails,
} from '../controllers/userController.js';
import { authorizeduser, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.route('/create').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/forgot/pass').post(forgotPassword);
router.route('/password/reset/:token').put(forgotPassword);

router.route('/myDetails').get(isAuthenticated, getUserDetails);
router.route('/password/update').put(isAuthenticated, changePassword);
router.route('/me/update').put(isAuthenticated, updateUserDetails);
router
  .route('/adminLogin/users')
  .get(isAuthenticated, authorizeduser('admin'), getAllUsers);
router
  .route('/user/details/:id')
  .get(isAuthenticated, authorizeduser('admin'), getSingleUser)
  .put(isAuthenticated, authorizeduser('admin'), updateuserByAdmin)
  .delete(isAuthenticated, authorizeduser('admin'), deleteUser);

export default router;
