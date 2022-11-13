import { DayProgress } from '../../../types/Feed/UserSpecificChallenge';

export function getFormattedDateArray(date: string, progress: DayProgress[]) {
  console.log('🚀 ~ file: formatter.ts ~ line 4 ~ getFormattedDateArray ~ date', date);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfTheWeek = new Date(date).getDay();
  console.log(
    '🚀 ~ file: formatter.ts ~ line 6 ~ getFormattedDateArray ~ dayOfTheWeek',
    dayOfTheWeek,
  );
  // get today from week
  const today = week[new Date().getDay()];

  for (let i = 0; i < dayOfTheWeek; i++) {
    week.push(week.shift() as string);
    progress.push(progress.shift() as DayProgress);
  }
  const formattedWeekWithCheck = week.map((day, index) => {
    return {
      day: day,
      progress: progress[index],
    };
  });
  return { formattedWeekWithCheck, today };
}
