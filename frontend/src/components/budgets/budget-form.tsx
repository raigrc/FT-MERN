import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BudgetSchema, BudgetSchemaType } from "@/schema/BudgetSchema";
import { useEffect, useState, useTransition } from "react";
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
import { Input } from "../ui/input";
import { addBudget } from "@/api/axios.addBudget";
import { useUserStore } from "@/store/useUserStore";

const CategoryForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isPending, startTransition] = useTransition();
  const { user } = useUserStore();

  const form = useForm<BudgetSchemaType>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      amount: 0,
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const onSubmit = (values: BudgetSchemaType) => {
    startTransition(() => {
      const userId = user?._id;

      addBudget(userId, values);
    });
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

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
