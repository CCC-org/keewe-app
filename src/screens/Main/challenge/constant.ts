import reaction from '../../../../assets/svgs/StatisticIcon/reaction';
import bookmark from '../../../../assets/svgs/StatisticIcon/bookmark';
import comment from '../../../../assets/svgs/StatisticIcon/comment';
import view from '../../../../assets/svgs/StatisticIcon/view';

export const timeConverter = (time: string) => {
  return time.replace(/-/g, '. ');
};

export const dateAdd = (time: string, week: number) => {
  const cur = new Date(time);
  cur.setDate(cur.getDate() + 7 * week - 1);
  const end = cur.toISOString().split('T')[0];
  return end.replace(/-/g, '. ');
};

export const STATISTIC: Record<string, any>[] = [
  { name: 'viewCount', xml: view },
  { name: 'reactionCount', xml: reaction },
  { name: 'commentCount', xml: comment },
  { name: 'bookmarkCount', xml: bookmark },
];
