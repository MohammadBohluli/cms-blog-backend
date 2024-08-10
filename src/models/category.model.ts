import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { logger } from "../utils";
import slugify from "slugify";

export interface CategorySchema extends Base {}

// Hooks
@pre<CategorySchema>("save", function (next) {
  if (!this.isModified("slug")) return next();
  try {
    this.slug = slugify(this.title, { lower: true });
    next();
  } catch (err) {
    logger.error(err);
  }
})
@modelOptions({ schemaOptions: { collection: "category", id: false } })
export class CategorySchema extends TimeStamps {
  @prop({ required: true, minlength: 3, maxlength: 155 })
  public title!: string;

  @prop({ required: true })
  public slug!: string;

  // virtual methods
  public get categoryId() {
    return this._id.toHexString();
  }
}

export const CategoryModel = getModelForClass(CategorySchema);
