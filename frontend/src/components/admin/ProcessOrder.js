import React, { useState, useEffect } from 'react';
import './processOrder.css';
import MetaData from '../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import SideBar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../layout/Loader/Loading.js';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import {
  orderDetails,
  updateOrder,
  reset_order,
} from '../../reduxFeature/features/order/orderSlice';

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const { order, isError, message, isLoading, isUpdated } = useSelector(
    (state) => state.order
  );
  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('status', status);
    const payload = {
      id,
      myForm,
    };

    dispatch(updateOrder(payload));
  };

  useEffect(() => {
    dispatch(orderDetails(id));
    if (isError) {
      toast.error(message);
      dispatch(reset_order);
    }
    if (isUpdated) {
      toast.success(message);
      dispatch(reset_order);
    }
  }, [dispatch, id, isError, isUpdated, message]);
  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {isLoading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phone}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === 'Delivered'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {' '}
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.id}`}>
                            {item.name}
                          </Link>{' '}
                          <span>
                            {item.quantity} X ${item.price} ={' '}
                            <b>${item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === 'Processing' && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === 'Shipped' && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      isLoading ? true : false || status === '' ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
