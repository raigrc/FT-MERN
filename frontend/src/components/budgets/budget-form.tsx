import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BudgetSchema, BudgetSchemaType } from "@/schema/BudgetSchema";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { addBudget } from "@/api/axios.addBudget";
import { useUserStore } from "@/store/useUserStore";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import SelectCategories from "../shared/select-categories";
import ErrorMessage from "../auth/error-message";
import { updateBudget } from "@/api/axios.updateBudget";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { toast } from "sonner";
import LoadingState from "../shared/loading";

interface BudgetFormProps {
  initialValues?: Partial<BudgetSchemaType>;
  mode: "create" | "update";
  budgetId?: string | undefined;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  initialValues = {},
  mode = "create",
  budgetId,
}) => {
  const { fetchBudgets } = useBudgetsStore();
  const [isPending, startTransition] = useTransition();
  const { user } = useUserStore();
  const [error, setError] = useState("");

  const form = useForm<BudgetSchemaType>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: BudgetSchemaType) => {
    setError("");
    startTransition(() => {
      const userId = user?._id;

      mode === "create"
        ? addBudget(userId, values).then((response) => {
            if (response?.success) {
              fetchBudgets();
              toast.success(response.message, {
                description: format(new Date(), "PPpp"),
              });
            } else {
              setError(response.message);
            }
          })
        : updateBudget(values, budgetId).then((response) => {
            if (response?.success) {
              fetchBudgets();
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <SelectCategories
                onChange={field.onChange}
                defaultValue={field.value}
                type="expense"
                disabled={isPending}
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
                <Input placeholder="500" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={!field.value ? "text-muted-foreground" : ""}
                      disabled={isPending}
                    >
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={!field.value ? "text-muted-foreground" : ""}
                      disabled={isPending}
                    >
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <ErrorMessage message={error} />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <LoadingState>
                {mode === "create" ? "Adding Budget..." : "Updating Budget..."}
              </LoadingState>
            </>
          ) : mode === "create" ? (
            "Add Budget"
          ) : (
            "Update Budget"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BudgetForm;
