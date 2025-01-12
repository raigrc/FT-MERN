import { PrivacySchemaType } from "@/schema/SettingsSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const updatePrivacy = async (
  userId: string | undefined,
  data: PrivacySchemaType,
) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, data);
    console.log(response.data.message);
    return { success: true, message: response.data.message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response };
    } else {
      console.error(error);
      return { success: false };
    }
  }
};
