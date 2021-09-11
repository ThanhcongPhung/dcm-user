import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SSO_URL } from '../configs';

export default function PrivateRoute({ component: Component, path, ...rest }) {
  const { accessToken, verifying } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken)
          return <Component {...props} accessToken={accessToken} />;

        if (!verifying && !accessToken)
          window.location.assign(
            `${SSO_URL}/login?redirect_uri=${window.location.href}`,
          );

        return null;
      }}
    />
  );
}
