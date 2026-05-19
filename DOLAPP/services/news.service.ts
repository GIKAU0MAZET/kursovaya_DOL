import { api } from "./api";

export const newsService = {
  async getAllNews() {
    const response = await api.get("/news/");
    return response.data;
  },
};
