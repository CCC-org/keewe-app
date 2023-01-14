import React, { useState, useEffect } from 'react';
import { TitleApis } from '../../api/TitleAPI';
import { Title } from '../../../types/title/title';

export function useTitles(userId: string | number) {
  const [userTitles, setUserTitles] = useState<Title['data']>([]);
  useEffect(() => {
    async function getTitles() {
      TitleApis.getTitleList(userId).then((res) => setUserTitles(res));
    }
    getTitles();
  }, []);

  return [userTitles] as const;
}
