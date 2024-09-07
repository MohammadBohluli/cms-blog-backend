import { title } from "process";
import { BadRequest, NotFoundError } from "../errors";
import { ArticleModel } from "../models/article.model";
import { CategoryModel } from "../models/category.model";
import { CategoryDocument } from "../types/category.types";
import { slugy } from "../utils";
import { UpdateCategorySchema } from "./schema/category.schema";

class CategoryRepo {
  public async getAll(): Promise<CategoryDocument[]> {
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
    const category = new CategoryModel({ title: title, slug: slugy(title) });
    const savedCategory = category.save({ validateBeforeSave: true });

    if (!(await savedCategory)) {
      throw new Error();
    }

    return category;
  }

  public async updateBySlug(
    categorySlug: string,
    category: UpdateCategorySchema["body"]
  ) {
    const updatedCategory = await CategoryModel.findOne({
      slug: categorySlug,
    });

    if (!updatedCategory) {
      throw new NotFoundError(
        "Category not found or somthing wrong in update."
      );
    }

    updatedCategory.title = category.title;
    const savedCategory = updatedCategory.save({ validateBeforeSave: true });

    // if savedCategory is success => update all article categories when certain category is updated
    if (await savedCategory) {
      await ArticleModel.updateMany(
        { categories: { $in: [categorySlug] } },
        { $set: { "categories.$": slugy(category.title) } }
      );
    } else {
      return savedCategory;
    }
  }

  public async deleteBySlug(categorySlug: string): Promise<void> {
    // check is exist an article with this category
    const category = await ArticleModel.findOne({
      categories: { $in: categorySlug },
    });

    if (category) {
      throw new BadRequest(
        "This category cannot be deleted. because the articles exist with this category"
      );
    }

    const deletedCategory = await CategoryModel.findOneAndDelete({
      slug: categorySlug,
    });
    if (!deletedCategory) throw new NotFoundError("category not found.");
  }

  public async isExist(categories: string[]): Promise<CategoryDocument[]> {
    const categoryList = await CategoryModel.find({
      slug: { $in: categories },
    }).select(["slug", "-_id"]);
    return categoryList;
  }
}

const categoryRepo = new CategoryRepo();
export default categoryRepo;
