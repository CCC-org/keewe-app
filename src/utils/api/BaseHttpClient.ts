import axios from 'axios';
import { navigate } from '../hooks/navigaton/navigator';

const httpClient = axios.create();
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data == 402) navigate('SignUp', undefined);
  },
);

export default httpClient;
