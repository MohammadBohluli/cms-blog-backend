import { ArticleDocument } from "../types/article.types";
import articleMapper from "./article.mapper";
import articleRepo from "./article.repository";

class ArticleServices {
  public async getAllArticle() {
    const articles = await articleRepo.getAll();
    return articleMapper.toDispalyAll(articles);
  }

  public async getArticle(articleSlug: string) {
    const article = await articleRepo.getBySlug(articleSlug);
    return articleMapper.toDispaly(article);
  }

  public async createArticle(
    userId: string,
    article: Partial<ArticleDocument>,
    categories: string[]
  ): Promise<ArticleDocument> {
    return await articleRepo.create(userId, article, categories);
  }

  public async updateArticle(
    articleSlug: string,
    article: Partial<ArticleDocument>,
    categories: string[]
  ): Promise<void> {
    await articleRepo.updateBySlug(articleSlug, article, categories);
  }

  public async deleteArticle(articleSlug: string): Promise<void> {
    await articleRepo.deleteBySlug(articleSlug);
  }
}

const articleServices = new ArticleServices();
export default articleServices;
