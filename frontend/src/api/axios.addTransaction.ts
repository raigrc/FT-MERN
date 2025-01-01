import { TransactionSchemaType } from "@/schema/TransactionSchema";
import axiosInstance from "./axios.instance";

export const addTransaction = async (
  userId: string | undefined,
  data: TransactionSchemaType,
) => {
  try {
    await axiosInstance
      .post("/transactions", { userId, ...data })
      .then((response) => console.log("Transaction added:", response));
  } catch (error) {
    console.error("Error during adding budget!", error);
    return null;
  }
};
