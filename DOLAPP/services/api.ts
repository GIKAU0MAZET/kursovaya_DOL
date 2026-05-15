import axios from "axios";
import { BASE_URL } from "../constants/config";
import { tokenService } from "./token.service";

export const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// 🧠 REQUEST INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const token = await tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const refresh = await tokenService.getRefreshToken();

      if (!refresh) {
        throw new Error("No refresh token");
      }

      const res = await axios.post(`${BASE_URL}/auth/refresh/`, {
        refresh,
      });

      const newAccess = res.data.access;

      await tokenService.setTokens(newAccess, refresh);

      api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;

      processQueue(null, newAccess);

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      await tokenService.clearTokens();

      if (logoutHandler) {
        logoutHandler();
      }

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
