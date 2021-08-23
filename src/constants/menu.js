import routes from './route';
import { SUB_CAMPAIGN } from './index';

export default [
  {
    heading: 'campaign',
    icon: 'home',
    subMenus: [
      {
        heading: 'campaignList',
        icon: 'bar_chart',
        route: routes.CAMPAIGNS,
      },
      {
        heading: 'myCampaign',
        icon: 'widgets',
        route: `/campaigns/sub-campaign/${SUB_CAMPAIGN.MY_CAMPAIGN}`,
      },
      {
        heading: 'otherCampaign',
        icon: 'comment',
        route: `/campaigns/sub-campaign/${SUB_CAMPAIGN.OTHER_CAMPAIGN}`,
      },
    ],
  },
  {
    heading: 'searchCampaign',
    icon: 'search',
    route: `${routes.SEARCH_CAMPAIGN}?pageType=search`,
  },
];
