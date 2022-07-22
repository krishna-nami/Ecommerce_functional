import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>

        <img src={playStore} alt="PlayStore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="midFooter">
        <h1>Fashion Online Store</h1>
        <p>High Quality is our first quality</p>
        <p>Copyright 2022 &copy; Krishna.Applicaiton</p>
      </div>

      <div className="rightFooter">
        <h4>Follows us</h4>
        <a href="/">LinkedIn</a>
        <a href="/">Facebook</a>
        <a href="/">My Profile</a>
      </div>
    </footer>
  );
};

export default Footer;
