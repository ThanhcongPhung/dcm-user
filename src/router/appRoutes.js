import Campaigns from '../pages/Campaigns';
import routes from '../constants/route';
import CampaignDetail from '../pages/CampaignDetail';
import Chatbot from '../pages/Chatbot';
import IntentReview from '../pages/IntentReview';
import ChatbotReview from '../pages/ChatbotReview';
import ChatbotResult from '../pages/ChatbotResult';
import NLU from '../pages/NLU';
import FAQTextCollection from '../pages/FAQTextCollection';

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
  chatbotIntentReview: {
    url: routes.CHATBOT_INTENT_REVIEW,
    component: IntentReview,
    private: true,
  },
  chatbotReview: {
    url: routes.CHATBOT_REVIEW,
    component: ChatbotReview,
    private: true,
  },
  chatbotManage: {
    url: routes.CHATBOT_COLLECT_RESULT,
    component: ChatbotResult,
    private: true,
  },
  NLU: {
    url: routes.NLU_COLLECT,
    component: NLU,
    private: true,
  },
  FAQTextCollection: {
    url: routes.FAQ_TEXT_COLLECT,
    component: FAQTextCollection,
    private: true,
  },
};
export default appRoutes;
