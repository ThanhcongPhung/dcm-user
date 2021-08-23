import api from './api';

export async function getCampaigns({
  search,
  fields,
  offset,
  limit,
  sort,
  serviceId,
  participantStatus,
  status,
}) {
  try {
    const response = await api({
      method: 'GET',
      url: '/campaigns',
      params: {
        search,
        fields,
        offset,
        limit,
        sort,
        serviceId,
        participantStatus,
        status,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function joinCampaign(campaignId) {
  try {
    const response = await api({
      method: 'POST',
      url: '/campaigns/join',
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function leaveCampaign(campaignId) {
  try {
    const response = await api({
      method: 'POST',
      url: '/campaigns/leave',
      headers: { 'campaign-id': campaignId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
