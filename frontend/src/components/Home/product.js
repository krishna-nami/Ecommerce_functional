import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

const product = ({ product }) => {
  const options = {
    readOnly: true,
    precision: 0.5,
    value: product.ratings,
    size: 'small',
  };
  return (
    <Link className="card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>

      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numofReviews} reviews)
        </span>
      </div>

      <span>${product.price}</span>
    </Link>
  );
};

export default product;
