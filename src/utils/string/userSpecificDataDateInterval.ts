export function isDatePassedMoreThanOneWeek(date: string) {
  //date = "2022-09-17"
  const now = new Date();
  const dateToCompare = new Date(date);
  const diffTime = Math.abs(now.getTime() - dateToCompare.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log('diffdsays;', diffDays);
  return diffDays > 7;
}
