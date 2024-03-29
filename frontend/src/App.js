import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect, useState } from 'react';
//Custom components
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import Loading from './components/layout/Loader/Loading';
import ProductDetials from './components/Product/ProductDetials.js';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginRegister from './components/User/LoginRegister';
import 'util/util.js';
import UserOptions from './components/layout/Header/UserOptions';
import Contact from './components/Home/Contact';
import About from './components/Home/About';
import './Header.css';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import Cart from './components/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import MyOrders from './components/Cart/MyOrders';
import OrderDetails from './components/Cart/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import UserList from './components/admin/UserList';
import OrderList from './components/admin/OrderList';

import CreateProduct from './components/admin/CreateProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import ProcessOrder from './components/admin/ProcessOrder';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const [stripeKey, setStripeKey] = useState('');
  async function getStripeKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    getStripeKey();
  }, []);

  return (
    <div>
      <Router>
        <Header />
        {user && <UserOptions user={user.user} />}

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route exact path="/load" element={<Loading />} />
          <Route path="/product/:id" element={<ProductDetials />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/products/:keyword/" element={<Products />} />
          <Route path="/search" element={<Search />} exact />
          <Route path="/login" element={<LoginRegister />} exact />
          <Route exact path="/profile" element={<ProtectedRoute />}>
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact path="/me/update" element={<ProtectedRoute />}>
            <Route exact path="/me/update" element={<UpdateProfile />} />
          </Route>
          <Route exact path="/password/update" element={<ProtectedRoute />}>
            <Route exact path="/password/update" element={<UpdatePassword />} />
          </Route>

          <Route path="/contact" element={<Contact />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route exact path="/shipping" element={<ProtectedRoute />}>
            <Route exact path="/shipping" element={<Shipping />} />
          </Route>
          <Route exact path="/order/confirm" element={<ProtectedRoute />}>
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          </Route>
          <Route
            exact
            path="/process/payment"
            element={<ProtectedRoute />}
          ></Route>
          <Route exact path="/orders" element={<ProtectedRoute />}>
            <Route exact path="/orders" element={<MyOrders />} />
          </Route>
          <Route exact path="/order/:id" element={<ProtectedRoute />}>
            <Route exact path="/order/:id" element={<OrderDetails />} />
          </Route>
          <Route exact path="/admin/dashboard" element={<ProtectedRoute />}>
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/admin/products" element={<ProtectedRoute />}>
            <Route exact path="/admin/products" element={<ProductList />} />
          </Route>
          <Route exact path="/admin/orders" element={<ProtectedRoute />}>
            <Route exact path="/admin/orders" element={<OrderList />} />
          </Route>
          <Route exact path="/admin/users" element={<ProtectedRoute />}>
            <Route exact path="/admin/users" element={<UserList />} />
          </Route>

          <Route
            exact
            path="/admin/create/product"
            element={<ProtectedRoute />}
          >
            <Route
              exact
              path="/admin/create/product"
              element={<CreateProduct />}
            />
          </Route>
          <Route
            exact
            path="/admin/update/product/:id"
            element={<ProtectedRoute />}
          >
            <Route
              exact
              path="/admin/update/product/:id"
              element={<UpdateProduct />}
            />
          </Route>
          <Route exact path="/admin/order/" element={<ProtectedRoute />}>
            <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          </Route>
          <Route exact path="/admin/user/" element={<ProtectedRoute />}>
            <Route exact path="/admin/user/:id" element={<UpdateUser />} />
          </Route>
          <Route exact path="/admin/reviews" element={<ProtectedRoute />}>
            <Route exact path="/admin/reviews" element={<ProductReviews />} />
          </Route>
        </Routes>

        {stripeKey && (
          <Elements stripe={loadStripe(stripeKey)}>
            <Routes>
              <Route exact path="/process/payment" element={<ProtectedRoute />}>
                <Route exact path="/process/payment" element={<Payment />} />
              </Route>
            </Routes>
          </Elements>
        )}

        <Footer />
      </Router>
      <ToastContainer limit={1} />
    </div>
  );
};

export default App;
