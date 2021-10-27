import api from './api';
import { FAQ_URL } from '../configs';

const baseURL = `${FAQ_URL}/api/faq/v1`;

export async function getRandomIntents(campaignId) {
  const response = await api({
    method: 'GET',
    url: `${baseURL}/intents/random`,
    headers: { 'campaign-id': campaignId },
  });
  return response;
}
