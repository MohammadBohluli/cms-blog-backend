import _, { xor } from "lodash";
import { CategoryDocument } from "../types/category.types";
import categoryMapper from "./category.mapper";
import categoryRepo from "./category.repository";
import { NotFoundError } from "../errors";

class CategoryServices {
  public async getAllCategory() {
    const categoreis = await categoryRepo.getAllCategory();
    return categoryMapper.toDispalyAll(categoreis);
  }

  public async getCategory(categorySlug: string) {
    const category = await categoryRepo.getBySlug(categorySlug);
    return categoryMapper.toDispaly(category);
  }

  public async createCategory(categoryTitle: string) {
    return await categoryRepo.create(categoryTitle);
  }

  public async updateCategory(categorySlug: string, categoryTitle: string) {
    await categoryRepo.updateBySlug(categorySlug, categoryTitle);
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
