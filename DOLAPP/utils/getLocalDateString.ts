export const getLocalDate = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tashkent", // или Asia/Almaty / Asia/Dhaka / UTC+5 аналог
  }).format(now);
};

export const normalizeDate = (date: string) => {
  return date.split("T")[0];
};
