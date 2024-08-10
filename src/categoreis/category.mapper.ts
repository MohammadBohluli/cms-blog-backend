import { CategoryDocument } from "../types/category.types";

class CategoryMapper {
  public toDispalyAll(categoryDocument: CategoryDocument[]) {
    return categoryDocument.map((cat) => ({
      id: cat.categoryId,
      title: cat.title,
      slug: cat.slug,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));
  }

  public toDispaly(categoryDocument: CategoryDocument) {
    return {
      id: categoryDocument.categoryId,
      title: categoryDocument.title,
      slug: categoryDocument.slug,
      createdAt: categoryDocument.createdAt,
      updatedAt: categoryDocument.updatedAt,
    };
  }
}

const categoryMapper = new CategoryMapper();
export default categoryMapper;
