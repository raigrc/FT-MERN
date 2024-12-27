import { z } from "zod";

export const BudgetSchema = z.object({
  categoryId: z.string(),
  amount: z.coerce.number({ message: "Amount must be number!" }),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export type BudgetSchemaType = z.infer<typeof BudgetSchema>;
