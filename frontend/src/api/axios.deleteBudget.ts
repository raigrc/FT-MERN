import axios from "axios";
import axiosInstance from "./axios.instance";

export const deleteBudget = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/budgets/${id}`);

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Unknown error occured" };
    }
  }
};
