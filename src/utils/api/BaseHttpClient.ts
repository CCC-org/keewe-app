import axios from 'axios';
import { getAccessToken } from '../hooks/asyncStorage/Login';
import { navigate } from '../hooks/navigaton/navigator';

const httpClient = axios.create();

httpClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token === undefined || token === null) {
      navigate('SignUp', undefined);
      return Promise.reject();
    }
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.code === 402 || error.response.data.code == 411)
      navigate('SignUp', undefined);
    else {
      navigate('Error', { error });
    }
  },
);

export default httpClient;
