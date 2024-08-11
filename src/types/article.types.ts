import { DocumentType } from "@typegoose/typegoose";
import { ArticleSchema } from "../models/article.model";

export enum ArticleStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
}

export type ArticleDocument = DocumentType<ArticleSchema>;
