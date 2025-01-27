import { ICategorySchema } from "@/schema/CategorySchema";
import axiosInstance from "./axios.instance";
import axios from "axios";

export const addCategory = async (
  userId: string | undefined,
  data: ICategorySchema,
) => {
  try {
    const response = await axiosInstance.post("/category", { userId, ...data });

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return {
        success: false,
        message: "Unknown error during adding category!",
      };
    }
  }
};
