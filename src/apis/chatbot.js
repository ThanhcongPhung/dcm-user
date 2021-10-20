import api from './api';
import { CHATBOT_URL } from '../configs';

export async function getChatInfo(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_URL}/api/chatbot/v1/chat/random`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getResultChat(campaignId, usecaseId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_URL}/api/chatbot/v1/chat/result`,
      headers: { 'campaign-id': campaignId },
      params: { usecaseId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getUsecases(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_URL}/api/chatbot/v1/usecases`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getUsecase(campaignId, usecaseId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_URL}/api/chatbot/v1/usecases/${usecaseId}`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getIntents(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_URL}/api/chatbot/v1/intents`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function editOwnerMessage(msgId, userSay, intentName) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${CHATBOT_URL}/api/chatbot/v1/messages/owner`,
      headers: { 'message-id': msgId },
      data: { userSay, intentName },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
