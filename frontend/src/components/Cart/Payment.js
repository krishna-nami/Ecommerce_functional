import React, { Fragment, useEffect, useRef } from 'react';
import CheckoutSteps from '../Cart/CheckoutStep';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import axios from 'axios';
import './Payment.css';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const Payment = () => {
  return <>payment</>;
};

export default Payment;
