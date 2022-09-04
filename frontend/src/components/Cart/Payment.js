import React, { Fragment, useRef, useState } from 'react';

import CheckoutSteps from '../Cart/CheckoutStep';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
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
import { createOrder } from '../../reduxFeature/features/order/orderSlice';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';

const Payment = () => {
  const { shippingAddress, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isError, order } = useSelector((state) => state.order);
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const [show, setShow] = useState(false);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const orderCreate = {
    shippingInfo: shippingAddress,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.user.name,
            email: user.user.email,
            address: {
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.postCode,
              country: shippingAddress.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        console.log(result.error.message);

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          orderCreate.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(orderCreate));
          setShow(true);
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const modalnavigate1 = () => {
    navigate('/orders');
  };
  const modalnavigate2 = () => {
    navigate('/products');
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
          <button
            className="paymentFormBtn1 "
            onClick={() => navigate('/order/confirm')}
          >
            Back to Order
          </button>
        </form>
      </div>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Order id:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Order has been placed</Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="secondary"
            onClick={modalnavigate2}
          >
            continue Shopping
          </Button>
          <Button variant="contained" color="primary" onClick={modalnavigate1}>
            View Your Orders
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Payment;
