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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import { addTransaction } from "@/api/axios.addTransaction";
import ErrorMessage from "../auth/error-message";
import SelectCategories from "../shared/select-categories";
import { updateTransaction } from "@/api/axios.updateTransaction";

interface TransactionFormProps {
  initialValues?: Partial<TransactionSchemaType>;
  mode: "create" | "update";
  transactionId?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  initialValues = {},
  mode = "create",
  transactionId,
}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const { user } = useUserStore();
  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: TransactionSchemaType) => {
    console.log(values);
    startTransition(() => {
      const userId = user?._id;

      mode === "create"
        ? addTransaction(userId, values).then((response) => {
            if (!response?.success) {
              setError(response?.message);
            }

            form.reset();
          })
        : updateTransaction(values, transactionId);
      // try {

      // } catch (error) {
      //   console.error("Error adding transaction", error);
      // }
    });
  };

  mode === "update"
    ? useEffect(() => {
        if (initialValues) {
          form.reset(initialValues);
        }
      }, [initialValues])
    : null;

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
                selectValue={field.value}
                // disabled={mode === "update" || isPending}
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
                <Input {...field} />
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
            {isPending
              ? "Loading..."
              : mode === "create"
                ? "Add Transaction"
                : "Update Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
