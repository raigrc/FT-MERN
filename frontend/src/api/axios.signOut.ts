import axios from "axios";
import axiosInstance from "./axios.instance";

export const signOut = async () => {
  try {
    const response = await axiosInstance.get("/auth/signout");
    console.log(response.data.message);

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
