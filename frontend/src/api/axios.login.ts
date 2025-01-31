import { LoginSchemaType } from "@/schema/AuthSchema";
import axiosInstance, { setAuthToken } from "./axios.instance";
import axios from "axios";

export const axiosLogin = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setAuthToken(response.data.token);
    }

    return {
      success: true,
      data: response.data,
      message: response.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      console.error("Error during login!", error);
      return { success: false, message: "Unknown error on login!" };
    }
  }
};
