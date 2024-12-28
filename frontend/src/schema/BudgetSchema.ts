import { z } from "zod";

export const BudgetSchema = z.object({
  categoryId: z.string({ message: "Please select a category" }),
  amount: z.coerce.number({ message: "Amount must be number!" }),
  start_date: z.date({ message: "Start date required" }),
  end_date: z.date({ message: "End date required" }),
});

export type BudgetSchemaType = z.infer<typeof BudgetSchema>;
