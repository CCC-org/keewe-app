import axios from 'axios';
import { navigate } from '../hooks/navigaton/navigator';

const httpClient = axios.create();
httpClient.interceptors.response.use(
  async (response) => response,
  (error) => {
    if (error.message == 'Request failed with status code 401') navigate('SignUp', undefined);
  },
);

export default httpClient;
