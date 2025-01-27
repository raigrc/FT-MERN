import { LoginSchemaType } from "@/schema/LoginSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const signUp = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/users", data);

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Error during signup!" };
    }
  }
};
