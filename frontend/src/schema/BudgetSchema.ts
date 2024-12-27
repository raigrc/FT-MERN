import { z } from "zod";

export const BudgetSchema = z.object({
  categoryId: z.string(),
  amount: z.number().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export type BudgetSchemaType = z.infer<typeof BudgetSchema>;
