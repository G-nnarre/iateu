import { create } from "zustand";
import { apiClient } from "../hooks/apiClient";

interface AuthState {
  user: { id: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: { id: string; email: string }, token: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {

    try {
      const res = await apiClient.get("/auth/validate");
      set({ user: res.data, token: res.data.token, isAuthenticated: true });
    } catch (error) {
      set({ user: null, token: null, isAuthenticated: false });
      console.log(error);
    }
  },
}));
