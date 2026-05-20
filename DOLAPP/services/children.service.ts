import { api } from "./api";

export const childrenService = {
  async getChildren() {
    const response = await api.get(`/children/`);

    return response.data;
  },

  async getChildById(id: string | null) {
    const response = await api.get(`/children/${id}/`);
    return response.data;
  },
};
