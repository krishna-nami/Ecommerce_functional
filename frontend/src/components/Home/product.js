import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const product = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.2)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 12 : 15,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <Rating {...options} />
        <span>({product.numofReviews} reviews)</span>
      </div>

      <span>${product.price}</span>
    </Link>
  );
};

export default product;
