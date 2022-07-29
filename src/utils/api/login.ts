export const kakaoLogin = async (code: string) => {
  const options = {
    method: 'GET',
    params: {
      code,
    },
  };
  const data = await fetch('https://api-keewe.com/api/v1/user/kakao', options);
  return data.json();
};
