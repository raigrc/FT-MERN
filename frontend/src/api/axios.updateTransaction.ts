import { TransactionSchemaType } from "@/schema/TransactionSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const updateTransaction = async (
  values: TransactionSchemaType,
  transactionId: string | undefined,
) => {
  try {
    await axiosInstance
      .put(`/transactions/${transactionId}`, values)
      .then((response) => {
        console.log(response.data.message);

        return { success: true, message: response.data.message };
      });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Uknown error updating transaction" };
    }
  }
};
