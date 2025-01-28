import axiosInstance from "./axios.instance";

export const verify = async () => {
  try {
    const response = await axiosInstance.get("/auth/verify", {
      withCredentials: true,
    });
    console.log(response);

    return response.data.user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
