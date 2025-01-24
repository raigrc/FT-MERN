import axiosInstance from "@/api/axios.instance";
import { BalanceCategoriesType } from "@/types/balance.types";
import { create } from "zustand";

interface ICategoryStore {
  categories: BalanceCategoriesType[] | null;
  setCategories: (categories: BalanceCategoriesType[]) => void;
  addCategoryStore: (category: BalanceCategoriesType) => void;
  fetchCategories: () => void;
}
export const useCategoriesStore = create<ICategoryStore>((set) => ({
  categories: null,
  setCategories: (categories) => set({ categories }),
  fetchCategories: async () => {
    const response = await axiosInstance.get("/balance/categories");
    if (response.status !== 200) {
      throw new Error("Failed fetching data");
    }

    const data = await response.data;
    set({
      categories: data,
    });
  },
  addCategoryStore: (category) =>
    set((state) => ({
      categories: state.categories
        ? [...state.categories, category]
        : [category],
    })),
}));
