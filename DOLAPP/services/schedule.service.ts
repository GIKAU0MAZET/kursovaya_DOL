import { api } from "./api";

export const scheduleService = {
  async getEvents() {
    const response = await api.get("/schedule/");

    return response.data;
  },

  async getAttendance(eventId: number) {
    const response = await api.get(`/schedule/${eventId}/attendance/`);

    return response.data;
  },

  async updateAttendance(
    eventId: number,
    childId: number,
    status: "attended" | "absent",
  ) {
    const response = await api.post(`/schedule/${eventId}/attendance/`, {
      child_id: childId,
      status,
    });

    return response.data;
  },
};
