export type ISODateString = string; // YYYY-MM-DD

// Убираем ВСЕ timezone проблемы
export const normalizeDate = (date: string): ISODateString => {
  return date.split("T")[0];
};

// Сегодня в UTC-safe формате (ВАЖНО: без локального сдвига)
export const todayDate = (): ISODateString => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

// Только для UI времени (не даты!)
export const formatTime = (time: string) => time.slice(0, 5);
