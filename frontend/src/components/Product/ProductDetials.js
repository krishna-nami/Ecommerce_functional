import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';

import ReviewCard from './ReviewCard.js';
import { addToCart } from '../../reduxFeature/features/order/cartSlice.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

//import custom files
import './productDetials.css';
import {
  getProduct,
  submitReview,
} from '../../reduxFeature/features/product/prouctSlice';
import Loading from '../layout/Loader/Loading';

const ProuctDetials = () => {
  const { isError, isLoading, product } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);

  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
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

  const addingToCart = () => {
    const payload = {
      id: product._id,
      name: product.name,
      image: product.images,
      quantity,
      stock: product.Stock,
      price: product.price,
    };
    dispatch(addToCart(payload));
    toast.success('Item added to Cart Successfully');
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmit = () => {
    const myForm = new FormData();
    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(submitReview(myForm));
    setOpen(false);
    dispatch(getProduct(id));
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
                <span className="detailsBlock-2-span">
                  ({product.numofReviews} Reviews)
                </span>
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
              <button onClick={submitReviewToggle} className="submitReview">
                {' '}
                Create Review
              </button>
            </div>
          </div>
          <h1 className="reviewTitle">Reviews</h1>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Your Review</DialogTitle>
            <DialogContent className="SubmitDialog">
              <Rating
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <DialogActions>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={submitReviewToggle}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={reviewSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
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
