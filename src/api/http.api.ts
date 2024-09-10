import { store } from "./../store/store";
import axios, { AxiosError } from "axios";
import { ApiError } from "@app/api/ApiError";
import {
  readToken,
  deleteToken,
  deleteUser,
} from "@app/services/localStorage.service";
import { doLogout } from "@app/store/slices/authSlice";

export const httpApi = axios.create({
  baseURL: "https://eabir-backend.onrender.com/api/v1/",
});

httpApi.interceptors.request.use((config) => {
  const token = readToken();

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

httpApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      deleteToken();
      deleteUser();

      store.dispatch(doLogout());

      // Navigate to login page on 401 error (unauthorized)
      window.location.href = "/auth/login"; // Use window.location to redirect
    }

    // Handle other errors
    throw new ApiError<ApiErrorData>(
      error.response?.data.message || error.message,
      error.response?.data
    );
  }
);

export interface ApiErrorData {
  message: string;
}
