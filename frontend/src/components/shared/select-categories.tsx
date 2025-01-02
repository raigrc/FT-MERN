import axiosInstance from "@/api/axios.instance";
import { ICategory } from "@/types/category.types";
import { useEffect, useState, useTransition } from "react";
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
  type,
}: {
  onChange: () => void;
  defaultValue: string;
  type?: string;
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      const getCategories = async () => {
        try {
          const response = await axiosInstance.get("/category", {
            params: type ? { type } : {},
          });

          setCategories(response.data.categories);
        } catch (error) {
          console.error("Error getting categories", error);
        }
      };
      getCategories();
    });
  }, [type]);
  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={isLoading}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories.length === 0 ? (
          <div>No categories found</div>
        ) : (
          categories.map((category) => (
            <SelectItem key={category._id} value={category._id}>
              {category.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectCategories;
