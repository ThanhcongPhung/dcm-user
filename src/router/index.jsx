import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Layout from '../containers/Layout';
import appRoutes from './appRoutes';
import { getCookie, setCookie } from '../utils/cookie';
import actions from '../redux/actions';

const PrivateApp = () => {
  const privateRoutes = Object.keys(appRoutes).filter(
    (route) => appRoutes[route].private,
  );

  return (
    <Layout>
      <Switch>
        {privateRoutes.map((privateRoute) => (
          <PrivateRoute
            path={appRoutes[privateRoute].url}
            component={appRoutes[privateRoute].component}
            exact
            key={appRoutes[privateRoute].url}
          />
        ))}
      </Switch>
    </Layout>
  );
};

export default function () {
  const dispatch = useDispatch();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { accessToken, verifying } = useSelector((state) => state.auth);
  useEffect(() => {
    const hashString = window.location.hash;
    if (hashString.split('#')[1]) {
      const { access_token: ssoToken } = hashString
        .split('#')[1]
        .split('&')
        .map((item) => {
          const [key, value] = item.split('=');
          return { [key]: value };
        })
        .reduce((acc, x) => Object.assign(acc, x), {});
      if (ssoToken) {
        window.open(window.location.pathname, '_self');
        setCookie('accessToken', ssoToken, 1 * 24 * 60 * 60 * 1000);
        return;
      }
    }
    if (!accessToken) {
      setCookie('accessToken', 'aaaaa', 1 * 24 * 60 * 60 * 1000);
      const accessTokenFromCookie = getCookie('accessToken');
      if (accessTokenFromCookie) {
        dispatch(actions.auth.verifyToken(accessTokenFromCookie));
      }
    }
    setIsFirstTime(false);
  }, []);

  if (isFirstTime || verifying) {
    return <CircularProgress />;
  }
  const publicRoutes = Object.keys(appRoutes).filter(
    (route) => !appRoutes[route].private,
  );

  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((publicRoute) => (
          <PublicRoute
            exact
            path={appRoutes[publicRoute].url}
            component={appRoutes[publicRoute].component}
            restricted={appRoutes[publicRoute].restricted}
            key={appRoutes[publicRoute].url}
          />
        ))}
        <PrivateRoute component={PrivateApp} />
      </Switch>
    </BrowserRouter>
  );
}
