import api from './api';
import { ASR_URL } from '../configs';

export async function getValidAudio(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/valid-campaigns`,
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function joinValidRoom(roomId, userId) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${ASR_URL}/api/v1/valid-rooms/join`,
      data: {
        roomId,
        userId,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function getValidRoom(roomId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/valid-rooms/${roomId}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
