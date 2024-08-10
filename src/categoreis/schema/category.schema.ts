import z from "zod";

export const categorySchema = z.object({
  body: z.strictObject({
    title: z.string({ required_error: "title is required" }),
  }),
});

export type CategorySchema = z.infer<typeof categorySchema>["body"];
