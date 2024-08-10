import { DocumentType } from "@typegoose/typegoose";
import { CategorySchema } from "../models/category.model";

export type CategoryDocument = DocumentType<CategorySchema>;
