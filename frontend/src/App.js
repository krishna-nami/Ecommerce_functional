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
import axios from 'axios';
import Payment from './components/Cart/Payment';

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
          <Route exact path="/process/payment" element={<ProtectedRoute />}>
            <Route exact path="/process/payment" element={<Payment />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer limit={2} />
    </div>
  );
};

export default App;
