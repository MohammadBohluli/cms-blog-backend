import { title } from "process";
import categoryServices from "../categoreis/category.services";
import { NotFoundError } from "../errors";
import { ArticleModel } from "../models/article.model";
import { ArticleDocument, ArticleStatus } from "../types/article.types";
import { slugy } from "../utils";

class ArticleRepo {
  public async getAll(): Promise<ArticleDocument[]> {
    const articles = await ArticleModel.find();
    if (articles.length === 0)
      throw new NotFoundError("There are no article add yet.");
    return articles;
  }

  public async getBySlug(articleSlug: string): Promise<ArticleDocument> {
    const article = await ArticleModel.findOne({ slug: articleSlug });
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    return article;
  }

  public async create(
    userId: string,
    article: Partial<ArticleDocument>,
    categories: string[]
  ): Promise<ArticleDocument> {
    const categoryList = await categoryServices.isExistCategory(categories);

    const createdArticle = await ArticleModel.create({
      userId: userId,
      categoreis: categoryList,
      title: article.title,
      slug: slugy(title),
      status: ArticleStatus.DRAFT,
      content: article.content,
    });
    return createdArticle;
  }

  public async updateBySlug(
    articleSlug: string,
    article: Partial<ArticleDocument>,
    categories: string[]
  ): Promise<ArticleDocument> {
    const categoryList = await categoryServices.isExistCategory(categories);

    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { slug: articleSlug },
      {
        title: article.slug,
        slug: slugy(article.title as string),
        status: article.status,
        categoreis: categoryList,
        content: article.content,
      }
    );

    if (!updatedArticle) {
      throw new NotFoundError("Article not found or somthing wrong in update.");
    }
    return updatedArticle;
  }

  public async deleteBySlug(articleSlug: string): Promise<void> {
    const deletedArticle = await ArticleModel.findOneAndDelete({
      slug: articleSlug,
    });
    if (!deletedArticle) throw new NotFoundError("Article not found.");
  }
}

const articleRepo = new ArticleRepo();
export default articleRepo;
