import { UserProps } from "@/types/user.types";
import { create } from "zustand";

interface IUserStore {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
}
export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }),

  loading: true,
  setLoading: (loading) => set({ loading }),
}));
