import React from 'react';
import './CartItem.css';
import { Link } from 'react-router-dom';

const CartItem = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItem;
