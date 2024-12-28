import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string(),
  type: z.enum(["income", "expense"]),
});

export type ICategorySchema = z.infer<typeof CategorySchema>;
