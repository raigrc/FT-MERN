import { ProfileSchemaType } from "@/schema/SettingsSchema";
import axios from "axios";
import axiosInstance from "./axios.instance";

export const updateProfile = async (
  userId: string | undefined,
  data: ProfileSchemaType,
) => {
  try {
    console.log(data);

    const response = await axiosInstance.put(`/users/${userId}`, data);

    console.log("User updated successfully", response);

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      console.error("Error during login!", error);
      return { success: false };
    }
  }
};
