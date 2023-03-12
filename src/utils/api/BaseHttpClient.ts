import axios from 'axios';
import { navigate } from '../hooks/navigaton/navigator';

const httpClient = axios.create();
httpClient.interceptors.response.use(async (response) => {
  const data = response.data;

  if (data.code === 403) {
    navigate('SignUp', undefined);
  }
  return response;
});

export default httpClient;
