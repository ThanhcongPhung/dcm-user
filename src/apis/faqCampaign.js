import api from './api';
import { FAQ_URL } from '../configs';

const baseURL = `${FAQ_URL}/api/faq/v1`;

export async function contributeSimilarSentence({
  campaignId,
  intentId,
  userSays,
}) {
  const response = await api({
    method: 'POST',
    url: `${baseURL}/contributes/text`,
    headers: { 'campaign-id': campaignId },
    data: { intentId, userSays },
  });
  return response;
}
