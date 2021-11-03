import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import io from 'socket.io-client';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Layout from '../containers/Layout';
import appRoutes from './appRoutes';
import { getCookie, setCookie } from '../utils/cookie';
import actions from '../redux/actions';
import routes from '../constants/route';
import { ASR_URL } from '../configs';

let socketASR;
const redirectSocket = (privateRoute) => {
  const path = appRoutes[privateRoute].url;
  if (
    (path === routes.COLLECT_ASR_CAMPAIGN || routes.COLLECT_ASR_ROOM) &&
    socketASR
  ) {
    return (
      <PrivateRoute
        socket={socketASR}
        path={appRoutes[privateRoute].url}
        component={appRoutes[privateRoute].component}
        exact
        key={appRoutes[privateRoute].url}
      />
    );
  }
  return (
    <PrivateRoute
      path={path}
      component={appRoutes[privateRoute].component}
      exact
      key={appRoutes[privateRoute].url}
    />
  );
};
const PrivateApp = (socketASRReady) => {
  const privateRoutes = Object.keys(appRoutes).filter(
    (route) => appRoutes[route].private,
  );

  return (
    <Layout>
      <Switch>
        {privateRoutes.map((privateRoute) =>
          redirectSocket(privateRoute, socketASRReady),
        )}
      </Switch>
    </Layout>
  );
};

export default function () {
  const dispatch = useDispatch();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [socketASRReady, setSocketASRReady] = useState(false);
  const { accessToken, verifying, user } = useSelector((state) => state.auth);

  const setupSocketASR = async () => {
    socketASR = io(ASR_URL, {
      query: {
        token: user.userId,
      },
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    socketASR.on('disconnect', () => {
      socketASR = null;
      console.log('Socket Disconnected!');
    });

    socketASR.on('connection', () => {
      console.log('Socket Connected!');
    });
    setSocketASRReady(true);
  };

  useEffect(() => {
    if (user.userId && !socketASRReady) setupSocketASR();
  }, [user, socketASRReady]);

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
        setCookie('accessToken', ssoToken, 1 * 24 * 60 * 60 * 1000);
        window.open(window.location.pathname, '_self');
        return;
      }
    }
    if (!accessToken) {
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
        <PrivateRoute component={() => PrivateApp(socketASRReady)} />
      </Switch>
    </BrowserRouter>
  );
}
