import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const options = {
  edit: false,
  color: 'rgba(20, 20, 20, 0.2)',
  activeColor: 'tomato',
  size: window.innerWidth < 600 ? 18 : 22,
  value: 2.5,
  isHalf: true,
};

const product = ({ product }) => {
  return (
    <Link className="card" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <Rating {...options} />
        <span>(10 reviews)</span>
      </div>

      <span>${product.price}</span>
    </Link>
  );
};

export default product;
