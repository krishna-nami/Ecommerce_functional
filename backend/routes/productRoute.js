import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from '../controllers/productController.js';
import { authorizeduser, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.route('/products').get(getAllProducts);
router
  .route('/product/new')
  .post(isAuthenticated, authorizeduser('admin'), createProduct);
router
  .route('/product/:id')
  .patch(isAuthenticated, authorizeduser('admin'), updateProduct)
  .delete(isAuthenticated, authorizeduser('admin'), deleteProduct)
  .get(getProductDetails);

export default router;
