import React, { useEffect } from 'react';
import Sidebar from './Sidebar.js';
import './dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../reduxFeature/features/product/prouctSlice.js';
import { getAllOrders } from '../../reduxFeature/features/order/orderSlice.js';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders, totalAmount } = useSelector((state) => state.order);
  let outofStock = 0;
  products &&
    products.forEach((element) => {
      if (element.Stock === 0) {
        outofStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'total amount',
        backgroundColor: ['tomato'],
        hoverBackgroundcolor: ['rgb[197, 72, 49'],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['tomato', 'purple'],
        hoverBackgroundcolor: ['#4B5000', '#35014F'],
        data: [outofStock, products.length - outofStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1"> Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> $2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>3</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
