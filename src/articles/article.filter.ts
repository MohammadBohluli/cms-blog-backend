import { ModelType } from "@typegoose/typegoose/lib/types";
import { ZodSchema } from "zod";
import { ArticleModel } from "../models/article.model";
import { queryArticlesSchema } from "./schema/article.schema";

class APIFilter<T> {
  constructor(public model: ModelType<T>, private querySchema: ZodSchema) {
    this.model = model;
    this.querySchema = querySchema;
  }

  public filter(): this {
    return this;
  }
}

const filter = new APIFilter(ArticleModel, queryArticlesSchema);
