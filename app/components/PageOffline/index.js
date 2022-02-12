import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { ToastContainer, toast } from 'react-toastify';

import Routes from 'routing/Routes';
import messages from 'components/PageOffline/messages';

function PageOffline() {
  const intl = useIntl();
  useEffect(() => {
    toast.error(intl.formatMessage({ ...messages.disconnected }), {
      autoClose: false,
    });
  }, []);
  return (
    <>
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
    </>
  );
}

export default PageOffline;
