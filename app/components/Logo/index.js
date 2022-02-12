import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import Img from 'components/Img';

function Logo() {
  return (
    <div className="logo">
      <Link to="/" className="d-flex justify-content-center align-items-center">
        <Img src={logo} alt="logo" />
        <div className="mt-2 ms-2">
          <h1 className="text-uppercase logo__title m-0 f-2">Scientific</h1>
          <p className="text-muted m-0 p-0 logo__content">
            Summarization System
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Logo;
