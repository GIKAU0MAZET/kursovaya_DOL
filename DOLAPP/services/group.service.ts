import { api } from "./api";

export const groupService = {
  async getMyGroup() {
    const res = await api.get("/group/my-group/");
    return res.data;
  },
};
