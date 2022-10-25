import { getAccessToken } from '../hooks/asyncStorage/Login';
import axios from 'axios';
import { GetRepresentativeComments } from '../../types/comments';

export const CommentsApi = {
  getRepresentativeComments: async (id: string) => {
    const token = await getAccessToken();
    return axios
      .get<GetRepresentativeComments>(
        `https://api-keewe.com/api/v1/comments/representative/insights/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        return res.data;
      });
  },
};
