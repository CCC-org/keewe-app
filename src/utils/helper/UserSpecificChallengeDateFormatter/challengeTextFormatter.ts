export function formatChallengeText(remainingDays: number, startDate: string) {
  const today = new Date();
  const start = new Date(startDate);
  const diff = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));

  if (diffDays === 0) return '이번 주 챌린지도 힘내요!';

  if (remainingDays === 1) {
    return '드디어, 1번 남았어요!';
  } else if (remainingDays === 0) {
    return '대단해요! 이번 주 목표를 이뤘어요.';
  } else if (remainingDays >= 2 && remainingDays <= 7) {
    return `앞으로 번 ${remainingDays}더!`;
  }
  return '';
}
