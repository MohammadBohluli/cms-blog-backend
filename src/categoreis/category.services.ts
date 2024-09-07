import _ from "lodash";
import { NotFoundError } from "../errors";
import { CategoryDocument } from "../types/category.types";
import categoryMapper from "./category.mapper";
import categoryRepo from "./category.repository";
import { UpdateCategorySchema } from "./schema/category.schema";

class CategoryServices {
  public async getAllCategory() {
    const categoreis = await categoryRepo.getAll();
    return categoryMapper.toDispalyAll(categoreis);
  }

  public async getCategory(categorySlug: string) {
    const category = await categoryRepo.getBySlug(categorySlug);
    return categoryMapper.toDispaly(category);
  }

  public async createCategory(categoryTitle: string) {
    return await categoryRepo.create(categoryTitle);
  }

  public async updateCategory(
    categorySlug: string,
    category: UpdateCategorySchema["body"]
  ) {
    await categoryRepo.updateBySlug(categorySlug, category);
  }

  public async deleteCategory(categorySlug: string) {
    await categoryRepo.deleteBySlug(categorySlug);
  }

  public async isExistCategory(categories: string[]): Promise<string[]> {
    const categoryList = await categoryRepo.isExist(categories);
    const missMatchFields = _.difference(
      categories,
      _.map(categoryList, _.property("slug"))
    );

    if (missMatchFields.length === 0) {
      return _.map<CategoryDocument, string>(categoryList, _.property("slug"));
    } else {
      throw new NotFoundError(`categories ${missMatchFields} not found`);
    }
  }
}

const categoryServices = new CategoryServices();
export default categoryServices;
