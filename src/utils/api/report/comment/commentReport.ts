import { getAccessToken } from '../../../hooks/asyncStorage/Login';
import httpClient from '../../BaseHttpClient';

export interface reportType {
  reportType: 'SPAM' | 'INAPPROPRIATE_CONTENT' | 'ABUSE' | 'IMPERSONATION' | 'OTHERS';
  reason: string;
  commentId: number;
}

export async function reportComment(report: reportType) {
  const token = await getAccessToken();

  try {
    const res = await httpClient.post<ReportResponse>(
      'https://api-keewe.com/api/v1/report/comment',
      report,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status !== 200) throw new Error('Report status is not 200');

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export interface ReportResponse {
  message: string;
  code: number;
  data: null;
}
