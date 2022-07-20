import express from 'express';
const router = express.Router();

import {
  deleteOrder,
  getAllOrders,
  getAllOrdersAdmin,
  getOrder,
  newOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { isAuthenticated, authorizeduser } from '../middleware/auth.js';

router.route('/order/new').post(isAuthenticated, newOrder);
//check order detials for the user
router.route('/order/:id').get(isAuthenticated, getOrder);

router.route('/orders/me').get(isAuthenticated, getAllOrders);

router
  .route('/admin/orders')
  .get(isAuthenticated, authorizeduser('admin'), getAllOrdersAdmin);

router
  .route('/admin/order/:id')
  .put(isAuthenticated, authorizeduser('admin'), updateOrderStatus)
  .delete(isAuthenticated, authorizeduser('admin'), deleteOrder);

export default router;
