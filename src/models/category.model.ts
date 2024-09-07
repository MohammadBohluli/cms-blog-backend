import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { logger, slugy } from "../utils";

export interface CategorySchema extends Base {}

@pre<CategorySchema>("save", async function (next) {
  if (!this.isModified("title")) return next();
  try {
    this.slug = slugy(this.title);

    next();
  } catch (err) {
    logger.error(err);
  }
})
@modelOptions({ schemaOptions: { collection: "categories", id: false } })
export class CategorySchema extends TimeStamps {
  @prop({ required: true, minlength: 3, maxlength: 155 })
  public title!: string;

  @prop({ unique: true, required: true })
  public slug!: string;

  // virtual methods
  public get categoryId() {
    return this._id.toHexString();
  }
}

export const CategoryModel = getModelForClass(CategorySchema);
