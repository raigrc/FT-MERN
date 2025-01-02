import { useState, useTransition } from "react";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import { addTransaction } from "@/api/axios.addTransaction";
import ErrorMessage from "../auth/error-message";
import SelectCategories from "../shared/select-categories";

const TransactionForm = () => {
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
              <SelectCategories
                onChange={field.onChange}
                defaultValue={field.value}
              />
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
