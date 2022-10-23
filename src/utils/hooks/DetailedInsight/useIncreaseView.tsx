import { useState, useEffect } from 'react';
import { DetailedPostApi } from '../../api/DetailedPostAPI';

export const useIncreaseView = (id: string | number) => {
  const [view, setView] = useState(0);

  useEffect(() => {
    DetailedPostApi.IncreaseViewCount(String(id)).then((res) => {
      res.viewCount && setView(res.viewCount);
    });
  }, [id]);

  return [view];
};
