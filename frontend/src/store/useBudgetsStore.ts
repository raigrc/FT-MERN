import axiosInstance from "@/api/axios.instance";
import { BalanceBudgetsType } from "@/types/balance.types";
import { create } from "zustand";
interface IBudgetsStore {
  budgets: BalanceBudgetsType[] | null;
  setBudgets: (budgets: BalanceBudgetsType[]) => void;
  fetchBudgets: () => void;
  addBudgetStore: (budget: BalanceBudgetsType) => void;
}

export const useBudgetsStore = create<IBudgetsStore>((set) => ({
  budgets: null,
  setBudgets: (budgets) => set({ budgets }),
  addBudgetStore: (budget) =>
    set((state) => ({
      budgets: state.budgets ? [budget, ...state.budgets] : [budget],
    })),
  fetchBudgets: async () => {
    const response = await axiosInstance.get("/balance/budgets");
    if (response.status !== 200) {
      throw new Error("Failed fetching data");
    }
    const data = await response.data;
    set({ budgets: data });
  },
}));
