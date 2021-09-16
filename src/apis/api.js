import axios from 'axios';
import camelCase from 'camelcase-keys';
import { API_URL } from '../configs';

const axiosClient = axios.create({
  baseURL: `${API_URL}/api/base/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  },
);

export default axiosClient;
