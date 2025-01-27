import { BudgetSchemaType } from "@/schema/BudgetSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const updateBudget = async (
  values: BudgetSchemaType,
  budgetId: string | undefined,
) => {
  try {
    const response = await axiosInstance.put(`/budgets/${budgetId}`, values);

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Uknown error updating budget" };
    }
  }
};
