import api from './api';
import { CHATBOT_URL } from '../configs';

export async function getUserSays({
  search,
  campaignId,
  sort,
  status,
  intentNames,
  range,
}) {
  try {
    const response = await api({
      method: 'POST',
      url: `${CHATBOT_URL}/api/chatbot/v1/usersays`,
      headers: { 'campaign-id': campaignId },
      params: { search, status, intentNames, range, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
