import axios from 'axios';
import { navigate } from '../hooks/navigaton/navigator';

const httpClient = axios.create();
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data == 402) navigate('SignUp', undefined); // 토큰 만료시
    // else {
    //   return navigate('Error', { error });
    // }
    // ChallengeInvite 작업 중 지장이 있어 임시 주석 처리
  },
);

export default httpClient;
