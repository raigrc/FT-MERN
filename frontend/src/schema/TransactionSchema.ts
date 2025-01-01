import { z } from "zod";

export const TransactionSchema = z.object({
  categoryId: z.string({ message: "Please select a category" }).nonempty(),
  amount: z.coerce
    .number({ message: "Enter an amount" })
    .min(0.01, { message: "Amount must be greater than 0" }),
  description: z.string().optional(),
  transaction_date: z.date(),
});

export type TransactionSchemaType = z.infer<typeof TransactionSchema>;
