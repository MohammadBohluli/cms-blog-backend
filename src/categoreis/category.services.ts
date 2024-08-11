import categoryMapper from "./category.mapper";
import categoryRepo from "./category.repository";

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
}

const categoryServices = new CategoryServices();
export default categoryServices;
