import { api } from "./api";

export const educatorService = {
  async getMyGroup() {
    const res = await api.get("/children/group/"); // поменяли путь
    return res.data;
  },
};
