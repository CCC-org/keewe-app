import axios from 'axios';
import { navigate } from '../hooks/navigaton/navigator';

const httpClient = axios.create();
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.code === 402) navigate('SignUp', undefined); // 토큰 만료시
    else {
      navigate('Error', { error });
    }
  },
);

export default httpClient;
