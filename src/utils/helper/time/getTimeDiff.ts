type FormattedDate = string;

export function getTimeDiff(dateStr: FormattedDate): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());

  // Get diff in days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Get diff in weeks
  const diffWeeks = Math.floor(diffDays / 7);

  // Get diff in months
  const diffMonths = Math.floor(diffDays / 30);

  if (diffDays <= 6) {
    return `${diffDays}일 전`;
  } else if (diffWeeks <= 4) {
    return `${diffWeeks}주 전`;
  } else {
    return `${diffMonths}달 전`;
  }
}
