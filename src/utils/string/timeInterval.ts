export const getTimeInterval = (interval: number) => {
  const minutes = Math.floor(interval / 1000 / 60);
  const hours = Math.floor(interval / 1000 / 60);
  const days = Math.floor(interval / 1000 / 60 / 24);
  const months = Math.floor(interval / 1000 / 60 / 24 / 12);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  if (days < 30) {
    return `${days}일 전`;
  }
  if (months < 12) {
    return `${months}달 전`;
  }
  return '오래된';
};
