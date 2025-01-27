import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string({ message: "category name is required" }).min(1),
  type: z.enum(["income", "expense", "savings"], {
    message: "category type is required",
  }),
});

export type ICategorySchema = z.infer<typeof CategorySchema>;
