import { Gallery } from "@/types/gallery.types";

export const groupGalleryByDate = (photos: Gallery[]) => {
  const grouped: Record<string, Gallery[]> = {};

  photos.forEach((item) => {
    const date = new Date(item.event_date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(item);
  });

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => {
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .map(([date, data]) => ({
      title: date,
      data,
    }));
};
