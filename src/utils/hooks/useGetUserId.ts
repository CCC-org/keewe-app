import { useState, useEffect } from 'react';
import { getUserId } from './asyncStorage/Login';

export const useGetUserId = () => {
  const [userId, setUserId] = useState<number | null | undefined>();

  useEffect(() => {
    getUserId().then((res) => setUserId(Number(res)));
  });
  return userId;
};
