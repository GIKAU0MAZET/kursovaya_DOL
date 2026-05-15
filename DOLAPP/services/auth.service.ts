import { api } from "./api";
import { tokenService } from "./token.service";

export const authService = {
  // 🔐 LOGIN
  async login(email: string, password: string) {
    const response = await api.post("/auth/login/", {
      email,
      password,
    });

    const { access, refresh } = response.data;

    await tokenService.setTokens(access, refresh);

    return response.data;
  },

  // 📝 REGISTER
  async register(data: { email: string; password: string; username: string }) {
    const response = await api.post("/auth/register/", data);

    return response.data;
  },

  // 👤 GET CURRENT USER
  async me() {
    const token = await tokenService.getAccessToken();

    const response = await api.get("/auth/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  // 🔁 REFRESH TOKEN
  async refresh() {
    const refreshToken = await tokenService.getRefreshToken();

    const response = await api.post("/auth/refresh/", {
      refresh: refreshToken,
    });

    const { access } = response.data;

    await tokenService.setTokens(access, refreshToken!);

    return access;
  },

  // 🚪 LOGOUT
  async logout() {
    await tokenService.clearTokens();
  },
};
