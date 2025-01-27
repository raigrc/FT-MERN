import { LoginSchemaType } from "@/schema/LoginSchema";
import axiosInstance from "./axios.instance";
import axios from "axios";

export const axiosLogin = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      console.error("Error during login!", error);
      return null;
    }
  }
};
