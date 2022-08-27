import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import Rating from 'react-rating-stars-component';
import ReviewCard from './ReviewCard.js';
import { addToCart } from '../../reduxFeature/features/order/cartSlice.js';

//import custom files
import './productDetials.css';
import { getProduct } from '../../reduxFeature/features/product/prouctSlice';
import Loading from '../layout/Loader/Loading';

const ProuctDetials = () => {
  const { isError, isLoading, product } = useSelector(
    (state) => state.products
  );
  const { cartItems } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const options = {
    edit: false,
    color: 'rgba(20, 20, 20, 0.2)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 12 : 15,
    value: product.ratings,
    isHalf: true,
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  const increment = () => {
    if (quantity >= product.Stock) {
      toast.warning('Sorry, We dont have more items in stock');
      return;
    } else {
      setQuantity(quantity + 1);
    }
  };
  const decrement = () => {
    if (quantity < 1) {
      toast.warning('cart cannot have negative value', { autoclose: 2000 });
      return;
    }
    setQuantity(quantity - 1);
  };

  const payload = {
    id: product._id,
    name: product.name,
    image: product.images,
    quantity,
    stock: product.Stock,
    price: product.price,
  };

  const addingToCart = () => {
    dispatch(addToCart(payload));
    toast.success('Item added to Cart Successfully');
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="productDetials">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImg"
                      src={item.url}
                      key={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numofReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>${product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decrement}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increment}>+</button>
                  </div>
                  <button onClick={addingToCart}>Add to Cart</button>
                </div>

                <p>
                  Status:{' '}
                  <b
                    className={
                      product.Stock < 1
                        ? 'redColor'
                        : product.Stock < 5 && product.Stock >= 1
                        ? 'orangeColor'
                        : 'greenColor'
                    }
                  >
                    {product.Stock < 1
                      ? 'OutOfStock'
                      : product.Stock < 5 && product.Stock >= 1
                      ? 'LowStock'
                      : 'InStock'}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview"> Submit Review</button>
            </div>
          </div>
          <h1 className="reviewTitle">Reviews</h1>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} />
                ))}{' '}
            </div>
          ) : (
            <p className="noReviews"> No Review Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProuctDetials;
