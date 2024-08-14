import z from "zod";
import { ArticleStatus } from "../../types/article.types";

export const createArticleSchema = z.object({
  body: z.strictObject({
    title: z
      .string({ required_error: "title is required" })
      .min(5, { message: "title must be more than 3 characters" })
      .max(155, { message: "tile must be less than 155 characters" }),
    categories: z
      .string({ required_error: "categories is required" })
      .array()
      .min(1, { message: "Select at least one category" }),
    status: z.enum([ArticleStatus.PUBLISHED, ArticleStatus.DRAFT], {
      message: "Status can only be 'published' or 'draft'",
    }),
    content: z.string({ required_error: "content is required" }).min(50),
  }),
});

export const updateArticleSchema = z.object({
  body: z.strictObject({
    title: z
      .string({ required_error: "title is required" })
      .min(5, { message: "title must be more than 3 characters" })
      .max(155, { message: "tile must be less than 155 characters" }),
    categories: z
      .string({ required_error: "categories is required" })
      .array()
      .min(1, { message: "Select at least one category" }),
    status: z.enum([ArticleStatus.PUBLISHED, ArticleStatus.DRAFT], {
      message: "Status can only be 'published' or 'draft'",
    }),
    content: z.string({ required_error: "content is required" }).min(50),
  }),
  params: z.strictObject({
    articleSlug: z.string(),
  }),
});

export const deleteArticleSchema = z.object({
  params: z.strictObject({
    articleSlug: z.string(),
  }),
});

export const getArticleSchema = z.object({
  params: z.strictObject({
    articleSlug: z.string(),
  }),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>["body"];
export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
export type DeleteArticleSchema = z.infer<typeof deleteArticleSchema>["params"];
export type GetArticleSchema = z.infer<typeof getArticleSchema>["params"];
