import { BudgetSchemaType } from "@/schema/BudgetSchema";
import axiosInstance from "./axios.instance";
import axios from "axios";

export const addBudget = async (
  userId: string | undefined,
  data: BudgetSchemaType,
) => {
  try {
    const response = await axiosInstance.post("/budgets", {
      userId,
      ...data,
    });
    console.log("Budget added:", response);
    return { success: true, message: "Budget added successfully!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || "An error has occured!",
      };
    } else {
      return {
        success: false,
        message: "An unknown error has occured!",
      };
    }
  }
};
