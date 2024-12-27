import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BudgetSchema, BudgetSchemaType } from "@/schema/BudgetSchema";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios.instance";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/category.types";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const CategoryForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<BudgetSchemaType>({
    resolver: zodResolver(BudgetSchema),
  });

  const onSubmit = (values: BudgetSchemaType) => {
    console.log(values);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");

        setCategories(response.data.categories);
      } catch (error) {}
    };
    getCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CategoryForm;
