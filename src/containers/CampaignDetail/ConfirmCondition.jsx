import React from 'react';
import { CAMPAIGN_TYPE } from '../../constants';
import ChatbotIntent from './Chatbot/DetailIntent';
import ChatbotUsecase from './Chatbot/DetailUsecase';

export default function DetailCondition({ campaignType, detailCampaign }) {
  switch (campaignType) {
    case CAMPAIGN_TYPE.CHATBOT_INTENT: {
      return (
        <ChatbotIntent
          intents={(detailCampaign && detailCampaign.intents) || []}
        />
      );
    }
    case CAMPAIGN_TYPE.CHATBOT_USECASE: {
      return (
        <ChatbotUsecase
          usecases={(detailCampaign && detailCampaign.usecases) || []}
        />
      );
    }
    default:
      return <div />;
  }
}
