import { api } from "./api";

export const childrenService = {
  async getChildren() {
    const response = await api.get("/children/");

    return response.data;
  },
};
