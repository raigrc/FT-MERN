import axiosInstance from "@/api/axios.instance";
import { BalanceCategoriesType } from "@/types/balance.types";
import { create } from "zustand";

interface ICategoryStore {
  categories: BalanceCategoriesType[] | null;
  fetchCategories: (options?: any) => void;
}
export const useCategoriesStore = create<ICategoryStore>((set) => ({
  categories: null,
  fetchCategories: async (options = {}) => {
    const response = await axiosInstance.get("/balance/categories", {
      params: options,
    });
    if (response.status !== 200) {
      throw new Error("Failed fetching data");
    }

    const data = await response.data;
    set({
      categories: data,
    });
  },
}));
