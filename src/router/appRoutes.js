import Campaigns from '../pages/Campaigns';
import routes from '../constants/route';
import CampaignDetail from '../pages/CampaignDetail';

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
  campaignDetail: {
    url: routes.CAMPAIGN_DETAIL,
    component: CampaignDetail,
    private: true,
  },
};
export default appRoutes;
