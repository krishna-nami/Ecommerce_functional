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
  getAllOrders,
  deleteOrder,
  updateOrder,
  reset_delete,
} from '../../reduxFeature/features/order/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();

  const { isLoading, isDelete, orders } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'itemQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 170,
      flex: 0.5,
    },
    {
      field: 'amount',
      headerName: 'Amount',
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
            <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, 'id'))
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
    dispatch(getAllOrders());
    if (isDelete) {
      dispatch(getAllOrders());
      dispatch(reset_delete());
    }
  }, [dispatch, isDelete]);

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        itemQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
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

export default OrderList;
