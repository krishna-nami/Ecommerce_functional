import ErrorHandler from '../utils/errorhandler.js';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import catchError from '../middleware/asyncErrorsHandler.js';

export const processPayment = catchError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'aud',
    metadata: {
      company: 'myEcommerce',
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeKey = catchError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
