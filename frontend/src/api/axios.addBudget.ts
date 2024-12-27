import { BudgetSchemaType } from "@/schema/BudgetSchema";
import axiosInstance from "./axios.instance";

export const addBudget = async (
  userId: string | undefined,
  data: BudgetSchemaType,
) => {
  try {
    await axiosInstance
      .post("/budgets", {
        userId,
        ...data,
      })
      .then((response) => console.log("Budget added:", response));
  } catch (error) {
    console.error("Error during adding budget!", error);
    return null;
  }
};
