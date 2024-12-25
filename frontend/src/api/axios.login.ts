import { LoginSchemaType } from "@/schema/LoginSchema";
import axiosInstance from "./axios.instance";

export const axiosLogin = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);

    return response;
  } catch (error) {
    console.error(error);
  }
};
