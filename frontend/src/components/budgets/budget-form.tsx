import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BudgetSchema, BudgetSchemaType } from "@/schema/BudgetSchema";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios.instance";
import { ICategory } from "@/types/category.types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CategoryForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const form = useForm<BudgetSchemaType>({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
