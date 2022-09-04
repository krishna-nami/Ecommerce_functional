import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/config/config.env' });
import catchError from '../middleware/asyncErrorsHandler.js';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = catchError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'aud',
    metadata: {
      company: 'Ecommerce',
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeKey = catchError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
