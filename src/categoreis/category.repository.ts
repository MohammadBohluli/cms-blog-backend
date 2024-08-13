import { NotFoundError } from "../errors";
import { CategoryModel } from "../models/category.model";
import { CategoryDocument } from "../types/category.types";
import { UpdateCategorySchema } from "./schema/category.schema";

class CategoryRepo {
  public async getAllCategory(): Promise<CategoryDocument[]> {
    const categories = await CategoryModel.find();
    if (categories.length === 0) {
      throw new NotFoundError("There are no categories add yet.");
    }
    return categories;
  }

  public async getBySlug(categorySlug: string): Promise<CategoryDocument> {
    const category = await CategoryModel.findOne({ slug: categorySlug });
    if (!category) {
      throw new NotFoundError("Category not found");
    }
    return category;
  }

  public async create(title: string): Promise<CategoryDocument> {
    const category = await CategoryModel.create({
      title: title,
    });

    return category;
  }

  public async updateBySlug(
    categorySlug: string,
    category: UpdateCategorySchema["body"]
  ): Promise<CategoryDocument> {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      {
        slug: categorySlug,
      },
      { title: category.title }
    );
    if (!updatedCategory) {
      throw new NotFoundError(
        "Category not found or somthing wrong in update."
      );
    }
    return updatedCategory;
  }

  public async deleteBySlug(categorySlug: string): Promise<void> {
    const deletedCategory = await CategoryModel.findOneAndDelete({
      slug: categorySlug,
    });
    if (!deletedCategory) throw new NotFoundError("category not found.");
  }

  public async isExist(categoreis: string[]): Promise<CategoryDocument[]> {
    const categoryList = await CategoryModel.find({
      slug: { $in: categoreis },
    }).select(["slug", "-_id"]);
    return categoryList;
  }
}

const categoryRepo = new CategoryRepo();
export default categoryRepo;
