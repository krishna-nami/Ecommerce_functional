import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './productReviews.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import Star from '@material-ui/icons/Star';
import SideBar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { getReviews } from '../../reduxFeature/features/product/prouctSlice';

const ProductReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reviews, isError, message, isLoading } = useSelector(
    (state) => state.products
  );
  const [id, setId] = useState('');
  // useEffect(() => {
  //   dispatch(getReviews(id));
  // }, [dispatch, id]);
  const deleteReviewHandler = (reviewId) => {
    //dispatch(deleteReviews(reviewId, productId));
    alert(reviewId);
  };
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    alert(id);
    dispatch(getReviews(id));
  };
  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 350,
      flex: 1,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, 'rating') >= 3
          ? 'greenColor'
          : 'redColor';
      },
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={isLoading ? true : false || id === '' ? true : false}
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
