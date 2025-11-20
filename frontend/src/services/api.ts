import axios, { AxiosError } from "axios";
import { parseApiError } from "@/types/api.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage =
        currentPath === "/login" || currentPath === "/register";

      if (!isAuthPage) {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    }

    // Parse the error into a consistent format
    const apiError = parseApiError(error);

    return Promise.reject(apiError);
  }
);

export default api;
