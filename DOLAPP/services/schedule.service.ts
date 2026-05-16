import { api } from "./api";

export const scheduleService = {
  async getEvents() {
    const response = await api.get("/schedule/");

    return response.data;
  },
};
