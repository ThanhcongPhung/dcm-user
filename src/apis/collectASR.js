import api from './api';
import { ASR_URL, UPLOAD_URL, UPLOAD_AUTH_KEY } from '../configs';

export async function getCollectRoom(campaignId) {
  try {
    const response = await api({
      method: 'GET',
      url: `${ASR_URL}/api/v1/campaigns/${campaignId}`,
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

export async function uploadFile(formData) {
  try {
    const response = await api({
      method: 'POST',
      url: `${UPLOAD_URL}/api/v1/uploads/file`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${UPLOAD_AUTH_KEY}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
export async function getTranscript(audioLink) {
  try {
    const response = await api({
      method: 'POST',
      url: `${ASR_URL}/api/v1/files/transcript`,
      data: { audioLink },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function createAudio(audioInfo) {
  try {
    const response = await api({
      method: 'POST',
      url: `${ASR_URL}/api/v1/audios`,
      data: { audioInfo },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateTranscript(audioInfo) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${ASR_URL}/api/v1/audios/transcript`,
      data: { audioInfo },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function updateUserLike(audioInfo) {
  try {
    const response = await api({
      method: 'PUT',
      url: `${ASR_URL}/api/v1/audios/like`,
      data: { audioInfo },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
