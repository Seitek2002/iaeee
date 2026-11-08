import type { Article, Issue } from "@/shared/api";

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export function matchArticle(article: Article, query: string) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = norm(`${article.title} ${article.authors}`);
  return words.every((w) => hay.includes(w));
}

/** Выпуски, в которых нашлись статьи, и сами найденные статьи. */
export function filterIssues(issues: Issue[], query: string) {
  return issues
    .map((issue) => ({
      issue,
      articles: issue.articles.filter((a) => matchArticle(a, query)),
    }))
    .filter((x) => !query.trim() || x.articles.length > 0);
}
