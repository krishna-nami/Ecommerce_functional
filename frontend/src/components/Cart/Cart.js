import React, { Fragment } from 'react';
import './Cart.css';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
} from '../../reduxFeature/features/order/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (product, quantity) => {
    if (product.stock <= quantity) {
      toast.warning('Sorry, We do not have more stock remaining');
      return;
    }
    const payload = {
      id: product.id,
      name: product.name,
      image: product.image,
      quantity,
      stock: product.stock,
      price: product.price,
    };
    dispatch(addToCart(payload));
  };

  const decreaseQuantity = (product, quantity) => {
    if (1 >= product.quantity) {
      toast.warning('Cart item cannot be less than 1');
      return;
    }

    const payload = {
      id: product.id,
      name: product.name,
      image: product.image,
      quantity,
      stock: product.stock,
      price: product.price,
    };
    //const payload = {};

    dispatch(addToCart(payload));
  };

  const deleteCartItems = (id) => {
    const payload = { id };

    dispatch(removeFromCart(payload));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Products</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.id}>
                  <CartItem item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() => decreaseQuantity(item, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() => increaseQuantity(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
