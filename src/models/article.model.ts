import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ArticleStatus } from "../types/article.types";
import { CategorySchema } from "./category.model";
import { UserSchema } from "./user.model";

export interface ArticleSchema extends Base {}

@modelOptions({ schemaOptions: { collection: "articles", id: false } })
export class ArticleSchema extends TimeStamps {
  @prop({ required: true })
  public userId!: Ref<UserSchema>;

  @prop({ required: true })
  public categoreis!: Ref<CategorySchema>[];

  @prop({ required: true, minlength: 5, maxlength: 155 })
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
