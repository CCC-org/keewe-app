import axios from 'axios';

export const kakaoLogin = async (code: string) => {
  alert('hihi');
  alert('naver');
  const response = await axios.get(`https://api-keewe.com/api/v1/user/kakao?code=${code}`, {});
  return undefined;
};
