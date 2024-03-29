import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './productList.css';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './Sidebar';
import Loading from '../layout/Loader/Loading';

import {
  getAllProducts,
  deleteProduct,
  reset_delete,
} from '../../reduxFeature/features/product/prouctSlice';

const ProductList = () => {
  const dispatch = useDispatch();

  const { isLoading, isDelete, products } = useSelector(
    (state) => state.products
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
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
            <Link
              to={`/admin/update/product/${params.getValue(params.id, 'id')}`}
            >
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getAllProducts());
    if (isDelete) {
      dispatch(getAllProducts());
      dispatch(reset_delete());
    }
  }, [dispatch, isDelete]);

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
