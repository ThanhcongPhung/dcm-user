import Campaigns from '../pages/Campaigns';
import routes from '../constants/route';

const appRoutes = {
  campaigns: {
    url: routes.CAMPAIGNS,
    component: Campaigns,
    private: true,
  },
  subCampaigns: {
    url: routes.SUB_CAMPAIGN,
    component: Campaigns,
    private: true,
  },
  searchCampaigns: {
    url: routes.SEARCH_CAMPAIGN,
    component: Campaigns,
    private: true,
  },
};
export default appRoutes;
