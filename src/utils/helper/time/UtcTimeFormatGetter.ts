export function getTime() {
  const d = new Date();
  d.setHours(d.getHours() + 9);
  const n = d.toISOString();
  return n.slice(0, -1);
}
