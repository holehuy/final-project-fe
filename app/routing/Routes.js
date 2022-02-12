import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { Redirect, Switch, Route } from 'react-router-dom';
import PrivateRoutes from 'routing/PrivateRoutes';
import { ENDPOINT } from 'shared/constants/endpoint';
import { CookiesStorage } from 'shared/configs/cookie';
import AuthPage from 'containers/Auth/authPage';
import MasterLayout from 'containers/MasterLayout';
import { makeSelectMyProfile } from 'containers/Auth/selectors';
import ErrorsPage from 'components/Errors';

const { ROUTING } = ENDPOINT;

function Routes({ dataProfile }) {
  const isAuthorized = CookiesStorage.authenticated();

  return (
    <Switch>
      {!isAuthorized ? (
        <Route>
          <AuthPage />
        </Route>
      ) : (
        <Redirect from={ROUTING.AUTH} to={ROUTING.DASHBOARD} />
      )}

      <Route path={ROUTING.ERROR} component={ErrorsPage} />

      {!isAuthorized ? (
        <Redirect to={ROUTING.LOGIN} />
      ) : (
        <MasterLayout>
          {typeof dataProfile?.profile === 'object' && (
            <PrivateRoutes roles={dataProfile?.profile?.role} />
          )}
        </MasterLayout>
      )}
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(Routes);
