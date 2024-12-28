import { ICategorySchema } from "@/schema/CategorySchema";
import axiosInstance from "./axios.instance";

export const addCategory = async (
  userId: string | undefined,
  data: ICategorySchema,
) => {
  try {
    await axiosInstance
      .post("/category", { userId, ...data })
      .then((response) =>
        console.log("Successfully added category!", response),
      );
  } catch (error) {
    console.error("Error during adding budget!", error);
    return null;
  }
};
