import axios from "axios";
import axiosInstance from "./axios.instance";

export const deleteCategoryById = async (id: string) => {
  try {
    await axiosInstance.delete(`/category/${id}`).then((response) => {
      console.log(response.data.message);

      return { success: true, message: response.data.message };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Unknown error deleting category" };
    }
  }
};
