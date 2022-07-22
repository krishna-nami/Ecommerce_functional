import React, { Fragment } from 'react';
import { CgMouse } from 'react-icons/cg';
import './Home.css';
import Product from './product.js';
import MetaData from '../layout/MetaData';

const product = {
  name: 'Tshirt',
  images: [{ url: 'https://i.ibb.co/DRST11n/1.webp' }],
  price: '35',
  _id: 'kkk',
};
function Home() {
  return (
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </>
  );
}
export default Home;
