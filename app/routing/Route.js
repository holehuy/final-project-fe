import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ENDPOINT } from 'shared/constants/endpoint';

const { ROUTING } = ENDPOINT;
function RouteCommon({ requiredRoles, path, component, roles, ...rest }) {
  const userHasRequiredRole = requiredRoles.includes(roles);

  return (
    <>
      {userHasRequiredRole ? (
        <Route {...rest} path={path} component={component} />
      ) : (
        <Redirect to={ROUTING.ERROR_404} />
      )}
    </>
  );
}
export default RouteCommon;
