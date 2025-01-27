import { TransactionSchemaType } from "@/schema/TransactionSchema";
import axiosInstance from "./axios.instance";
import axios from "axios";

export const addTransaction = async (
  userId: string | undefined,
  data: TransactionSchemaType,
) => {
  try {
    const response = await axiosInstance.post("/transactions", {
      userId,
      ...data,
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return {
        success: false,
        message: "Unknown error during adding transaction!",
      };
    }
  }
};
