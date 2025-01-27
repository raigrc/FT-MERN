import { ProfileSchemaType } from "@/schema/SettingsSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const updateProfile = async (
  userId: string | undefined,
  data: ProfileSchemaType,
) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, data);

    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data.message };
    } else {
      return { success: false, message: "Error during login!" };
    }
  }
};
