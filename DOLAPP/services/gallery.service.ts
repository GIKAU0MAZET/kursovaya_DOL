import { api } from "./api";

export const galleryService = {
  async getPhoto() {
    const response = await api.get("/gallery/");

    return response.data;
  },

  // 📤 загрузить фото
  async uploadPhoto(formData: FormData) {
    const response = await api.post("/gallery/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
