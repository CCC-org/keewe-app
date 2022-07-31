import axios from 'axios';

const httpClient = axios.create();

httpClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const response = error.response;
    if (typeof window === 'object') {
      if (response.code === 401) {
        //logout
      }
    }
    throw error;
  },
);

export default httpClient;
