export function getWeekDays() {
  const today = new Date();
  const start = new Date(today);

  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  start.setDate(start.getDate() + diff);

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    return {
      label: date.toLocaleDateString("ru-RU", { weekday: "short" }),
      date: date.toISOString().split("T")[0],
      day: date.getDate(),
      month: date.toLocaleDateString("ru-RU", {
        month: "short",
      }), // ← ВОТ ЭТО
    };
  });
}
