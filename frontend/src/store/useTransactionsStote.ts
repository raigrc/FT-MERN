import axiosInstance from "@/api/axios.instance";
import { BalanceTransactions } from "@/types/balance.types";
import { create } from "zustand";

interface ITransactionsStore {
  transactions: BalanceTransactions | null;
  setTransactions: (transactions: BalanceTransactions) => void;
  addTransactionStore: (transaction: any) => void;
  fetchTransactions: (options: any) => void;
}
export const useTransactionsStore = create<ITransactionsStore>((set) => ({
  transactions: null,
  setTransactions: (transactions) => set({ transactions }),
  addTransactionStore: (transaction) =>
    set(
      (state) =>
        ({
          transactions: state.transactions
            ? [transaction, ...state.transactions.transactions]
            : { ...transaction },
        }) as ITransactionsStore,
    ),
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
