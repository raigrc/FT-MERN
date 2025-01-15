import axiosInstance from "@/api/axios.instance";
import { useEffect, useState } from "react";

const useFetch = <T>(url: string, options = {}): { data: T | null } => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance(url, options);

        setData(response.data);
      } catch (error) {
        console.error("Error getting total balance", error);
      }
    };

    fetchData();
  }, [url, options]);

  return { data };
};

export default useFetch;
