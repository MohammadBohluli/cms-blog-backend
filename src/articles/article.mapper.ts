import { ArticleDocument } from "../types/article.types";

class ArticleMapper {
  public toDispalyAll(articleDocument: ArticleDocument[]) {
    return articleDocument.map((article) => ({
      id: article.articleId,
      userId: article.userId,
      title: article.title,
      slug: article.slug,
      categories: article.categories,
      status: article.status,
      content: article.content,
    }));
  }

  public toDispaly(articleDocument: ArticleDocument) {
    return {
      id: articleDocument.articleId,
      userId: articleDocument.userId,
      title: articleDocument.title,
      slug: articleDocument.slug,
      categories: articleDocument.categories,
      status: articleDocument.status,
      content: articleDocument.content,
    };
  }
}

const articleMapper = new ArticleMapper();
export default articleMapper;
