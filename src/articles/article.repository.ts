import categoryServices from "../categoreis/category.services";
import { NotFoundError } from "../errors";
import { ArticleModel } from "../models/article.model";
import { ArticleDocument } from "../types/article.types";
import { paginate } from "../utils";
import {
  CreateArticleSchema,
  QueryArticlesSchema,
  UpdateArticleSchema,
} from "./schema/article.schema";

class ArticleRepo {
  public async getAll(query: QueryArticlesSchema) {
    // pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 2;
    const offset = (page - 1) * limit;
    const totalItems = await ArticleModel.countDocuments({});
    const pagination = paginate(page, limit, totalItems);

    const articles = await ArticleModel.find().skip(offset).limit(limit);
    if (articles.length === 0) throw new NotFoundError("Not found");
    return { articles, pagination };
  }

  public async getBySlug(articleSlug: string): Promise<ArticleDocument> {
    const article = await ArticleModel.findOne({ slug: articleSlug });
    if (!article) {
      throw new NotFoundError("Article not found");
    }
    return article;
  }

  public async getUserArticles(userId: string): Promise<ArticleDocument[]> {
    const articles = await ArticleModel.find({ userId: userId });
    if (articles.length === 0)
      throw new NotFoundError("User no article add yet.");
    return articles;
  }

  public async create(
    userId: string,
    article: CreateArticleSchema
  ): Promise<ArticleDocument> {
    const categoryList = await categoryServices.isExistCategory(
      article.categories
    );

    const createdArticle = await ArticleModel.create({
      userId: userId,
      categories: categoryList,
      title: article.title,
      status: article.status,
      content: article.content,
    });
    return createdArticle;
  }

  public async updateBySlug(
    articleSlug: string,
    article: UpdateArticleSchema["body"]
  ): Promise<ArticleDocument> {
    const categoryList = await categoryServices.isExistCategory(
      article.categories
    );

    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { slug: articleSlug },
      {
        title: article.title,
        status: article.status,
        categories: categoryList,
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
