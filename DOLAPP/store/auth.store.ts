import { create } from "zustand";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";

type User = {
  id?: string;
  username?: string;
  //   email?: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  hydrateAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: true,
  isAuthenticated: false,

  // 🔐 LOGIN
  login: async (email, password) => {
    const res = await authService.login(email, password);
    const me = await authService.me();

    set({
      accessToken: res.access,
      refreshToken: res.refresh,
      user: me,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  register: async (email, password, username) => {
    await authService.register({
      email,
      password,
      username,
    });
  },

  // 🚪 LOGOUT
  logout: async () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });

    await tokenService.clearTokens();
  },

  // 🔄 HYDRATE (автологин при запуске)
  hydrateAuth: async () => {
    try {
      const access = await tokenService.getAccessToken();
      const refresh = await tokenService.getRefreshToken();

      if (!access || !refresh) {
        set({ isLoading: false, isAuthenticated: false });
        return;
      }

      // пробуем получить user
      const me = await authService.me();

      set({
        accessToken: access,
        refreshToken: refresh,
        user: me,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (e) {
      console.log("hydrate error", e);
      await tokenService.clearTokens();
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
