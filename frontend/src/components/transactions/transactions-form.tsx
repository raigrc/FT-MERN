import { useEffect, useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  TransactionSchema,
  TransactionSchemaType,
} from "@/schema/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import axiosInstance from "@/api/axios.instance";
import { ICategory } from "@/types/category.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import { addTransaction } from "@/api/axios.addTransaction";
import ErrorMessage from "../auth/error-message";

const TransactionForm = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const { user } = useUserStore();
  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      amount: "" as any,
      description: "",
      transaction_date: new Date(),
    },
  });

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

  const onSubmit = (values: TransactionSchemaType) => {
    startTransition(() => {
      try {
        const userId = user?._id;

        addTransaction(userId, values).then((response) => {
          if (!response?.success) {
            setError(response?.message);
          }

          form.reset();
        });
      } catch (error) {
        console.error("Error adding transaction", error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input {...field} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ErrorMessage message={error} />
        <div className="w-full text-right">
          <Button type="submit">
            {isPending ? "Loading..." : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
