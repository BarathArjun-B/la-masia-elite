import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let accessToken = null;
let refreshRequest = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      refreshRequest ||= authService.refreshToken().finally(() => {
        refreshRequest = null;
      });

      await refreshRequest;
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

const unwrap = (request) =>
  request
    .then((response) => response.data)
    .catch((error) => {
      const data = error.response?.data;
      const validation = Array.isArray(data?.errors) ? data.errors.join(" ") : "";
      throw new Error(validation || data?.message || error.message || "Request failed.");
    });

const authService = {
  async register(payload) {
    const data = await unwrap(api.post("/auth/register", payload));
    setAccessToken(data.accessToken);
    return data;
  },

  async login(payload) {
    const data = await unwrap(api.post("/auth/login", payload));
    setAccessToken(data.accessToken);
    return data;
  },

  async logout() {
    const data = await unwrap(api.post("/auth/logout"));
    setAccessToken(null);
    return data;
  },

  async refreshToken() {
    const data = await unwrap(api.post("/auth/refresh-token"));
    setAccessToken(data.accessToken);
    return data;
  },

  async me() {
    return unwrap(api.get("/auth/me"));
  },

  async forgotPassword(email) {
    return unwrap(api.post("/auth/forgot-password", { email }));
  },

  async resetPassword(payload) {
    return unwrap(api.post("/auth/reset-password", payload));
  },

  async verifyEmail(token) {
    return unwrap(api.get(`/auth/verify-email/${token}`));
  },
};

export { api };
export default authService;
