import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  isAuthenticated: boolean;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token, isAuthenticated: true }),
  isAuthenticated: false,
  clearToken: () => set({ token: null, isAuthenticated: false }),
}));
