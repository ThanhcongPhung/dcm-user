import Campaigns from '../pages/Campaigns';
import routes from '../constants/route';
import CampaignDetail from '../pages/CampaignDetail';
import Chatbot from '../pages/Chatbot';

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
    isLayout: true,
  },
  chatbot: {
    url: routes.CHATBOT_COLLECT,
    component: Chatbot,
    private: true,
    isLayout: false,
  },
  campaignDetail: {
    url: routes.CAMPAIGN_DETAIL,
    component: CampaignDetail,
    private: true,
  },
};
export default appRoutes;
