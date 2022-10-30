import axios from 'axios';
import { getAccessToken } from '../hooks/asyncStorage/Login';

const httpClient = axios.create();

// httpClient.interceptors.request.use(async (config) => {
//   const token = await getAccessToken();
//   config.headers?.Authorization && (config.headers.Authorization = `Bearer ${token}`);
// });

httpClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const response = error.response;
    if (typeof window === 'object') {
      // if (response.code === 401) {
      //   //logout
      // }
    }
    throw error;
  },
);

export default httpClient;
