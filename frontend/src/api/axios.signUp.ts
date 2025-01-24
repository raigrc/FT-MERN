import { LoginSchemaType } from "@/schema/LoginSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const signUp = async (data: LoginSchemaType) => {
  try {
    const response = await axiosInstance.post("/users", data);
    console.log(response.data);

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Error during signup!", error);
      return null;
    }
  }
};
