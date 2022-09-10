import React, { useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { getProducts } from '../../reduxFeature/features/product/prouctSlice';
import Loading from '../layout/Loader/Loading';
import Product from '../Home/Product';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const Products = () => {
  const { isLoading, isError, message, products, resultPerPage, productCount } =
    useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 500]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const ratingHandler = (e, newRate) => {
    setRating(newRate);
  };

  useEffect(() => {
    dispatch(getProducts({ keyword, currentPage, price, category, rating }));
  }, [
    message,
    dispatch,
    keyword,
    isError,
    currentPage,
    price,
    category,
    rating,
  ]);

  const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
    'Electronics',
  ];
  if (isError) {
    toast.error(message);
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className="productsHeading"> Our Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price ($)</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider"
              color="tomato"
              min={0}
              max={500}
              step={10}
            />

            <Typography>Catagory</Typography>
            <ul className="categoryBox">
              {categories.map((c) => (
                <li className="categories-Link" key={c}>
                  {' '}
                  <input
                    type="checkbox"
                    value={c}
                    checked={category === c}
                    onClick={() => setCategory(c)}
                    readOnly
                  />{' '}
                  {c}
                </li>
              ))}
            </ul>

            <Typography>Rating (Star)</Typography>
            <Slider
              value={rating}
              onChange={ratingHandler}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider"
              color="tomato"
              min={0}
              max={5}
              step={0.5}
            />
          </div>
          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={parseInt(currentPage)}
                itemsCountPerPage={parseInt(resultPerPage)}
                totalItemsCount={parseInt(productCount)}
                onChange={setCurrentPageNo}
                lastPageText="Last"
                itemClass="page-item"
                nextPageText=">>"
                prevPageText="<<"
                firstPageText="First"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
