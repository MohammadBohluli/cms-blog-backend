import { FilterQuery } from "mongoose";
import categoryServices from "../categoreis/category.services";
import { NotFoundError } from "../errors";
import { ArticleModel } from "../models/article.model";
import { ArticleDocument, ArticleStatus } from "../types/article.types";
import { paginate, slugy, UploadImage } from "../utils";
import {
  CreateArticleSchema,
  QueryArticlesSchema,
  UpdateArticleSchema,
} from "./schema/article.schema";

class ArticleRepo {
  public async getAll(query: QueryArticlesSchema) {
    const filter: FilterQuery<ArticleDocument> = {};

    // search title
    if (query.title) {
      filter.title = { $regex: query.title, $options: "i" };
    }

    // category filter
    if (query.category) {
      const categories = query.category.split(",");
      filter.categories = { $all: categories };
    }

    //createdAt filter
    if (query.startCreatedAt || query.endCreatedAt) {
      filter.createdAt = {};

      if (query.startCreatedAt) {
        filter.createdAt.$gte = new Date(query.startCreatedAt);
      }

      if (query.endCreatedAt) {
        filter.createdAt.$lte = new Date(query.endCreatedAt);
      }
    }

    // sorting
    let sort: { [key: string]: 1 | -1 } = {};
    if (query.sortBy) {
      if (!query.sortBy.startsWith("-")) {
        sort[query.sortBy] = 1;
      }
      sort[query.sortBy.substring(1)] = -1;
    } else {
      sort["createdAt"] = -1;
    }

    // pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 2;
    const offset = (page - 1) * limit;

    filter.status = ArticleStatus.PUBLISHED;
    const totalItems = await ArticleModel.countDocuments(filter);
    const pagination = paginate(page, limit, totalItems);

    const articles = await ArticleModel.find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .exec();
    if (articles.length === 0) throw new NotFoundError("Not found");
    return { articles, pagination };
  }

  public async getBySlug(articleSlug: string): Promise<ArticleDocument> {
    const article = await ArticleModel.findOne({
      slug: articleSlug,
      status: ArticleStatus.PUBLISHED,
    });
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
    article: CreateArticleSchema,
    articelImageUrl: string
  ): Promise<ArticleDocument> {
    // befor save article, category must be found
    const categoryList = await categoryServices.isExistCategory(
      article.categories
    );
    const createdArticle = new ArticleModel({
      userId: userId,
      categories: categoryList,
      title: article.title,
      status: article.status,
      content: article.content,
      slug: slugy(article.title),
      image: process.env.STATIC_FILE_ADDRESS + articelImageUrl,
    });

    const savedArticle = createdArticle.save({ validateBeforeSave: true });

    if (!(await savedArticle)) {
      throw new Error();
    }

    return savedArticle;
  }

  public async updateBySlug(
    articleSlug: string,
    article: UpdateArticleSchema["body"],
    articleImageUrl: string
  ): Promise<ArticleDocument> {
    const categoryList = await categoryServices.isExistCategory(
      article.categories
    );

    const updatedArticle = await this.getBySlug(articleSlug);

    UploadImage.deleteFromStorage(updatedArticle.image);

    updatedArticle.title = article.title;
    updatedArticle.status = article.status;
    updatedArticle.categories = categoryList;
    updatedArticle.content = article.content;
    updatedArticle.image = process.env.STATIC_FILE_ADDRESS + articleImageUrl;

    const savedArticle = updatedArticle.save({ validateBeforeSave: true });

    if (!(await savedArticle)) {
      throw new NotFoundError("Somthing wrong in update.");
    }
    return savedArticle;
  }

  public async deleteBySlug(articleSlug: string) {
    const deletedArticle = await ArticleModel.findOneAndDelete({
      slug: articleSlug,
    });
    if (!deletedArticle) throw new NotFoundError("Article not found.");

    return deletedArticle;
  }
}

const articleRepo = new ArticleRepo();
export default articleRepo;
