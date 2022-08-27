import express from 'express';
const router = express.Router();
import {
  processPayment,
  sendStripeKey,
} from '../controllers/paymentControllers.js';

import { isAuthenticated } from '../middleware/auth.js';

router.route('/payment/process').post(isAuthenticated, processPayment);
router.route('/stripeapikey').get(isAuthenticated, sendStripeKey);

export default router;
