import { TransactionSchemaType } from "@/schema/TransactionSchema";
import axiosInstance from "./axios.instance";
import axios from "axios";

export const addTransaction = async (
  userId: string | undefined,
  data: TransactionSchemaType,
) => {
  try {
    await axiosInstance
      .post("/transactions", { userId, ...data })
      .then((response) => {
        console.log("Transaction added:", response);
        return { success: true, message: "Transaction added successfully" };
      });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message || "An error occurred",
      };
    } else {
      return {
        success: false,
        message: "Unknown error during adding transaction!",
      };
    }
  }
  return;
};
