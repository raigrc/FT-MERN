import axiosInstance from "@/api/axios.instance";
import { BalanceTransactions } from "@/types/balance.types";
import { create } from "zustand";

interface ITransactionsStore {
  transactions: BalanceTransactions | null;
  fetchTransactions: (options?: any) => void;
}
export const useTransactionsStore = create<ITransactionsStore>((set) => ({
  transactions: null,
  fetchTransactions: async (options: {}) => {
    const response = await axiosInstance.get("/balance/transactions", {
      params: options,
    });
    if (response.status !== 200) {
      throw new Error("Failed fetching data");
    }
    const data = await response.data;
    set({ transactions: data });
  },
}));
