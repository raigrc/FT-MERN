import { CategorySchema, ICategorySchema } from "@/schema/CategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import React, { useEffect, useState, useTransition } from "react";
import { addCategory } from "@/api/axios.addCategory";
import { useUserStore } from "@/store/useUserStore";
import { updateCategory } from "@/api/axios.updateCategory";
import { useCategoriesStore } from "@/store/useCategoriesStore";
import { toast } from "sonner";
import { format } from "date-fns";
import ErrorMessage from "../auth/error-message";
interface CategoryFormProps {
  initialValues?: Partial<ICategorySchema>;
  mode: "create" | "update";
  categoryId?: string | undefined;
}
const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues = {},
  mode = "create",
  categoryId,
}) => {
  const form = useForm<ICategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialValues,
  });

  const [isPending, startTransition] = useTransition();
  const { user } = useUserStore();
  const { fetchCategories } = useCategoriesStore();
  const [error, setError] = useState("");

  const onSubmit = (values: ICategorySchema) => {
    startTransition(() => {
      const userId = user?._id;

      mode === "create"
        ? addCategory(userId, values).then((response) => {
            if (response?.success) {
              fetchCategories();
              toast.success(response.message, {
                description: format(new Date(), "PPpp"),
              });
            } else {
              setError(response.message);
            }
          })
        : updateCategory(values, categoryId).then((response) => {
            if (response?.success) {
              fetchCategories();
              toast.success(response.message, {
                description: format(new Date(), "PPpp"),
              });
            } else {
              setError(response.message);
            }
          });
    });
  };

  useEffect(() => {
    if (mode === "update" && initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Rent, Transportation, Income"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorMessage message={error} />

        <Button className="w-full">
          {isPending
            ? "Loading..."
            : mode === "create"
              ? "Add Category"
              : "Update Category"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
