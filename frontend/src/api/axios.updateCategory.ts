import { ICategorySchema } from "@/schema/CategorySchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const updateCategory = async (
  values: ICategorySchema,
  categoryId: string | undefined,
) => {
  try {
    const response = await axiosInstance.put(`/category/${categoryId}`, values);
    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Unknown error updating category" };
    }
  }
};
