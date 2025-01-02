import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BudgetSchema, BudgetSchemaType } from "@/schema/BudgetSchema";
import { useTransition } from "react";
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

const BudgetForm = () => {
  const [isPending, startTransition] = useTransition();
  const { user } = useUserStore();

  const form = useForm<BudgetSchemaType>({
    resolver: zodResolver(BudgetSchema),
  });

  const onSubmit = (values: BudgetSchemaType) => {
    startTransition(() => {
      const userId = user?._id;

      addBudget(userId, values);
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
              <FormLabel>Category</FormLabel>
              <SelectCategories
                onChange={field.onChange}
                defaultValue={field.value}
                type="expense"
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
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={!field.value ? "text-muted-foreground" : ""}
                  >
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
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
                  <Button
                    variant="outline"
                    className={!field.value ? "text-muted-foreground" : ""}
                  >
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {isPending ? "Loading..." : "Add Budget"}
        </Button>
      </form>
    </Form>
  );
};

export default BudgetForm;
