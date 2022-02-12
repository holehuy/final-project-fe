import React from 'react';
import { Online, Offline } from 'react-detect-offline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from 'routing/Routes';
import PageOffline from 'components/PageOffline';
import ScrollToTop from 'components/ScrollToTop';

export default function App() {
  return (
    <>
      <Online>
        <ScrollToTop />
        <Routes />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Online>
      <Offline>
        <PageOffline />
      </Offline>
    </>
  );
}
