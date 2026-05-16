import { api } from "./api";

export const galleryService = {
  async getPhoto() {
    const response = await api.get("/gallery/");

    return response.data;
  },
};
