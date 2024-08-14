import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArticleStatus } from "../types/article.types";
import { slugy } from "../utils";
import { CategorySchema } from "./category.model";
import { UserSchema } from "./user.model";

export interface ArticleSchema extends Base {}

@pre<ArticleSchema>("validate", function (next) {
  if (this.isModified("title")) {
    this.slug = slugy(this.title);
    next();
  }
})
@pre<ArticleSchema>("findOneAndUpdate", function (next) {
  const title = this.get("title");
  this.set("slug", slugy(title));
  next();
})
@modelOptions({
  schemaOptions: { collection: "articles", id: false },
  options: { allowMixed: Severity.ALLOW },
})
export class ArticleSchema extends TimeStamps {
  @prop({ required: true })
  public userId!: Ref<UserSchema>;

  @prop({ required: true })
  public categories!: Ref<CategorySchema>[];

  @prop({ required: true })
  public title!: string;

  @prop({ unique: true, required: true })
  public slug!: string;

  @prop({
    enum: () => ArticleStatus,
    default: ArticleStatus.DRAFT,
    required: true,
  })
  public status!: ArticleStatus;

  @prop({ required: true, minlength: 50 })
  public content!: string;

  // virtual methods
  public get articleId() {
    return this._id.toHexString();
  }
}

export const ArticleModel = getModelForClass(ArticleSchema);
