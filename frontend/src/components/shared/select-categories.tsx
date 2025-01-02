import axiosInstance from "@/api/axios.instance";
import { ICategory } from "@/types/category.types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormControl } from "../ui/form";

const SelectCategories = ({
  onChange,
  defaultValue,
}: {
  onChange: () => void;
  defaultValue: string;
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");

        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error getting categories", error);
      }
    };

    getCategories();
  }, []);
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectCategories;
