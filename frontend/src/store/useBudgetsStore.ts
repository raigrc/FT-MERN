import axiosInstance from "@/api/axios.instance";
import { BalanceBudgetsType } from "@/types/balance.types";
import { create } from "zustand";
interface IBudgetsStore {
  budgets: BalanceBudgetsType[] | null;
  fetchBudgets: (options?: any) => void;
}

export const useBudgetsStore = create<IBudgetsStore>((set) => ({
  budgets: null,
  fetchBudgets: async (options = {}) => {
    const response = await axiosInstance.get("/balance/budgets", {
      params: { options },
    });
    if (response.status !== 200) {
      throw new Error("Failed fetching data");
    }
    const data = await response.data;
    set({ budgets: data });
  },
}));
