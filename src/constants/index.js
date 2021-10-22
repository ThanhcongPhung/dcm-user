const CAMPAIGN_STATUS = {
  DRAFT: 'DRAFT',
  WAITING: 'WAITING',
  RUNNING: 'RUNNING',
  PAUSE: 'PAUSE',
  END: 'END',
};

const SUB_CAMPAIGN = {
  MY_CAMPAIGN: 'my-campaign',
  OTHER_CAMPAIGN: 'other-campaign',
};

const PAGINATION_LIMIT = 6;

const CAMPAIGN_TYPE = {
  CHATBOT_INTENT: 'CHATBOT_INTENT',
  CHATBOT_USECASE: 'CHATBOT_USECASE',
  FAQ: 'FAQ',
  SLU: 'SLU',
  ASR: 'ASR',
};

const CAMPAIGN_ROLE = {
  MANAGER: 'MANAGER',
  CONTRIBUTOR: 'CONTRIBUTOR',
  REVIEWER: 'REVIEWER',
  VIEWER: 'VIEWER',
};

const MAX_ITEMS_SMALL = 5;
const PAGINATION = { TABLE_REVIEW: 10 };

const REVIEW_RESULT_STATUS = {
  NOT_REVIEW: 'NOT_REVIEW',
  PASS: 'PASS',
  REJECT: 'REJECT',
};

const PARTICIPATION_STATUS = {
  JOINED: 'JOINED',
  INVITED: 'INVITED',
};

const RESULT_STATUS = {
  PROGRESS: 'PROGRESS',
  DONE: 'DONE',
};

const CHATBOT_RESULT_PAGE_TYPE = {
  MANAGE: 'manage',
  CONTRIBUTION: 'contribution',
};

export {
  CAMPAIGN_STATUS,
  CAMPAIGN_TYPE,
  SUB_CAMPAIGN,
  PAGINATION_LIMIT,
  MAX_ITEMS_SMALL,
  CAMPAIGN_ROLE,
  PARTICIPATION_STATUS,
  RESULT_STATUS,
  PAGINATION,
  REVIEW_RESULT_STATUS,
  CHATBOT_RESULT_PAGE_TYPE,
};
