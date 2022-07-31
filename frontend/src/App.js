import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
//Custom components
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import Loading from './components/layout/Loader/Loading';
import ProductDetials from './components/Product/ProductDetials.js';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginRegister from './components/User/LoginRegister';

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route exact path="/load" element={<Loading />} />
          <Route path="/product/:id" element={<ProductDetials />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/products/:keyword/" element={<Products />} />
          <Route path="/search" element={<Search />} exact />
          <Route path="/login" element={<LoginRegister />} exact />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
