import { LoginSchemaType } from "@/schema/LoginSchema";
import axiosInstance from "./axios.instance";
import axios from "axios";

export const axiosLogin = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Error during login!", error);
      return null;
    }
  }
};
