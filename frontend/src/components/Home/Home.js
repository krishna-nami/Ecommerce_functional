import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './Home.css';
import Product from './Product.js';
import MetaData from '../layout/MetaData';
import {
  getProducts,
  reset,
} from '../../reduxFeature/features/product/prouctSlice';
import Loading from '../layout/Loader/Loading';

const Home = () => {
  const { products, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  //use Effect to to triger triger actions
  useEffect(() => {
    dispatch(getProducts('', '', '', '', ''));

    if (isError) toast.error(message);
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess, isError, message]);

  if (isLoading) return <Loading />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Krishna Online" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>You Can Find Amazing Product Here</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="productHeading"> Featured Product</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};
export default Home;
