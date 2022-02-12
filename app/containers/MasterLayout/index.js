import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from 'components/Header';
import AsideMenu from 'components/AsideMenu';

export default function MasterLayout({ children }) {
  const [headerTitle, setHeaderTitle] = useState('');
  const changeHeaderTitle = title => {
    setHeaderTitle(title);
  };
  return (
    <div className="d-flex flex-column flex-root">
      <Helmet titleTemplate="%s">
        <meta name="description" content="RS Evaluation System" />
      </Helmet>
      <div className="page d-flex flex-row flex-column-fluid">
        <AsideMenu changeHeaderTitle={changeHeaderTitle} />
        <div
          className="wrapper d-flex flex-column flex-row-fluid"
          id="kt_wrapper"
        >
          <Header headerTitle={headerTitle} />
          <div className="content d-flex flex-column flex-column-fluid">
            <div className="container-fluid mx-0" id="content_container">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
