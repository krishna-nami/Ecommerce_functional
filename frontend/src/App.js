import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
//Custom components
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import Loading from './components/layout/Loader/Loading';
import ProductDetials from './components/Product/ProuctDetials.js';

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
          <Route path="/product/:id" element={<ProductDetials />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
