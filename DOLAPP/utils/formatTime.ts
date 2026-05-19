export function formatTime(time?: string) {
  if (!time) return "";

  return time.slice(0, 5);
}
