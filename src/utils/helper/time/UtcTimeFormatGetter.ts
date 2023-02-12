export function getTime() {
  const d = new Date();
  const n = d.toISOString();
  return n.slice(0, -1);
}
