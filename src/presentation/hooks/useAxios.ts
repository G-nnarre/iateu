import axios from "axios";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxios = () => {
  const { token, logout } = useAuthStore();

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.Authorization;
    }
  }, [token]);

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};
