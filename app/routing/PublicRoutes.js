import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ENDPOINT } from 'shared/constants/endpoint';
import { AuthPage } from 'containers/Auth/authPage';

const { ROUTING } = ENDPOINT;

export function PublicRoutes() {
  return (
    <Switch>
      <Route path={ROUTING.AUTH} component={AuthPage} />
      <Redirect to={ROUTING.AUTH} />
    </Switch>
  );
}
