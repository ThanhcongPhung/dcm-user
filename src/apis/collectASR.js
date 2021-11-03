import api from './api';
import { ASR_URL } from '../configs';

export async function getCollectRoom(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/collect-camps/${campaignId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getRecordRoom(roomId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/record-rooms/${roomId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
