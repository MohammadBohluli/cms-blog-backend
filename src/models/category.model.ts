import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface CategorySchema extends Base {}

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
