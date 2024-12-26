import { UserProps } from "@/types/user.types";
import { create } from "zustand";

interface IUser {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
}
export const useUserStore = create<IUser>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
