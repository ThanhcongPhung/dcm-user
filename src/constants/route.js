export default {
  CAMPAIGNS: '/',
  SUB_CAMPAIGN: '/campaigns/sub-campaign/:participantStatus',
  SEARCH_CAMPAIGN: '/campaigns/search',
  CAMPAIGN_DETAIL: '/campaigns/:campaignId',
  CHATBOT_COLLECT: '/campaigns/:campaignId/chatbot',
  CHATBOT_INTENT_REVIEW: '/campaigns/:campaignId/chatbot/review/intent',
  CHATBOT_REVIEW: '/campaigns/:campaignId/chatbot/review',
  CHATBOT_COLLECT_RESULT: '/campaigns/:campaignId/chatbot/result/:type',
  NLU_COLLECT: '/campaigns/:campaignId/nlu',
  FAQ_TEXT_COLLECT: '/campaigns/:campaignId/faq/contribute/text',
  VALID_AUDIO_CAMPAIGN: '/campaigns/:campaignId/valid-audio',
  COLLECT_ASR_CAMPAIGN: '/campaigns/:campaignId/collect-audio',
  VALID_AUDIO_ROOM: '/campaigns/:campaignId/valid-audio/:roomId',
};
