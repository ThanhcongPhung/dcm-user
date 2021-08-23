import api from './api';

export async function getServices({ search, fields, offset, limit, sort }) {
  try {
    const response = await api({
      method: 'GET',
      url: '/services',
      params: { search, fields, offset, limit, sort },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
