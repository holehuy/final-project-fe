import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { saveToken } from 'containers/Auth/actions';
import { makeSelectAccessToken } from 'containers/Auth/selectors';
import LoadingIndicator from 'components/LoadingIndicator';

const key = 'auth';

function LoginSuccess({ accessToken, onSaveToken }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (accessToken) {
      window.location.reload();
    } else {
      onSaveToken();
    }
  }, [accessToken]);

  return <LoadingIndicator />;
}

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSaveToken: () => dispatch(saveToken()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginSuccess);
