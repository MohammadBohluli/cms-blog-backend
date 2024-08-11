import z from "zod";

export const createCategorySchema = z.object({
  body: z.strictObject({
    title: z
      .string({ required_error: "title is required" })
      .min(3, { message: "title must be more than 3 characters" })
      .max(155, { message: "tile must be less than 155 characters" }),
  }),
});

export const updateCategorySchema = z.object({
  body: z.strictObject({
    title: z
      .string({ required_error: "title is required" })
      .min(3, { message: "title must be more than 3 characters" })
      .max(155, { message: "tile must be less than 155 characters" }),
  }),
  params: z.strictObject({
    categorySlug: z.string(),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.strictObject({
    categorySlug: z.string(),
  }),
});

export const getCategorySchema = z.object({
  params: z.strictObject({
    categorySlug: z.string(),
  }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>["body"];
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
export type DeleteCategorySchema = z.infer<
  typeof deleteCategorySchema
>["params"];
export type GetCategorySchema = z.infer<typeof getCategorySchema>["params"];
