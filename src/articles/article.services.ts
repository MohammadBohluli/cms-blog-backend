import { ArticleDocument } from "../types/article.types";
import articleMapper from "./article.mapper";
import articleRepo from "./article.repository";
import {
  CreateArticleSchema,
  QueryArticlesSchema,
  UpdateArticleSchema,
} from "./schema/article.schema";

class ArticleServices {
  public async getAllArticle(query: QueryArticlesSchema) {
    const { articles, pagination } = await articleRepo.getAll(query);
    const articleList = articleMapper.toDispalyAll(articles);
    return { articleList, pagination };
  }

  public async getUserArticles(userId: string) {
    const articles = await articleRepo.getUserArticles(userId);
    return articleMapper.toDispalyAll(articles);
  }

  public async getArticle(articleSlug: string) {
    const article = await articleRepo.getBySlug(articleSlug);
    return articleMapper.toDispaly(article);
  }

  public async createArticle(
    userId: string,
    article: CreateArticleSchema
  ): Promise<ArticleDocument> {
    return await articleRepo.create(userId, article);
  }

  public async updateArticle(
    articleSlug: string,
    article: UpdateArticleSchema["body"]
  ): Promise<void> {
    await articleRepo.updateBySlug(articleSlug, article);
  }

  public async deleteArticle(articleSlug: string): Promise<void> {
    await articleRepo.deleteBySlug(articleSlug);
  }
}

const articleServices = new ArticleServices();
export default articleServices;
