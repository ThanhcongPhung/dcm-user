import Home from '../pages/Home';
import routes from '../constants/route';

const appRoutes = {
  home: {
    url: routes.HOME,
    component: Home,
    private: true,
  },
};
export default appRoutes;
