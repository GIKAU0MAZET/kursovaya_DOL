import { EventStats } from "@/types/events.types";
import { api } from "./api";

export const eventsService = {
  getStats: async (childId: string): Promise<EventStats> => {
    const { data } = await api.get(`/schedule/${childId}/stats/`);

    return data;
  },
};
