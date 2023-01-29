import { useState, useEffect } from 'react';
import { getUserId } from './asyncStorage/Login';

export const useGetUserId = () => {
  const [userId, setUserId] = useState<string | null | undefined>();

  useEffect(() => {
    getUserId().then(setUserId);
  });
  return userId;
};
