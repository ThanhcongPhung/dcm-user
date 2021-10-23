import api from './api';
import { CHATBOT_URL } from '../configs';

const CHATBOT_API_URL = `${CHATBOT_URL}/api/chatbot/v1`;

export async function getMessages({ userId, campaignId, limit, sort }) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_API_URL}/messages`,
      params: {
        userId,
        campaignId,
        limit,
        sort,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getSkipMessage({ userId, msgId, campaignId, limit }) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_API_URL}/messages/skip`,
      params: {
        userId,
        msgId,
        campaignId,
        limit,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createMessage({
  campaignId,
  content,
  sender,
  receiver,
  nlu,
  usecaseId,
  sessionId,
  messageId,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: `${CHATBOT_API_URL}/messages`,
      data: {
        campaignId,
        content,
        sender,
        receiver,
        nlu,
        usecaseId,
        sessionId,
        messageId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateMessage({ messageId, content, nlu, sessionId }) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${CHATBOT_API_URL}/messages/${messageId}`,
      data: { content, nlu, sessionId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getRelationMessages({ campaignId, msgId, limit }) {
  try {
    const response = await api({
      method: 'GET',
      url: `${CHATBOT_API_URL}/messages/relation/${msgId}`,
      params: { limit },
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
