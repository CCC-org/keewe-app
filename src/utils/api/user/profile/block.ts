import axios from 'axios';
import { getAccessToken } from '../../../hooks/asyncStorage/Login';
import httpClient from '../../BaseHttpClient';

export async function blockUser(targetId: string | number) {
  const token = await getAccessToken();

  try {
    const res = await axios.post(
      'https://api-keewe.com/api/v1/user/profile/block/' + targetId,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data.message;
  } catch (e) {
    console.log('block error: ', e);
    return '차단할때 뭔가 잘못된듯. 아마도, 이미 차단한 유저일지도 모름';
  }
}
