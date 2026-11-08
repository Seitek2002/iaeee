import { news } from "./mock";
import type { NewsCategory, NewsItem } from "./types";

// Функции асинхронные специально: компоненты уже сейчас работают с ними как с
// сетевым API, и подключение бэкенда не потребует переписывать вызовы.

const byDateDesc = (a: NewsItem, b: NewsItem) => b.date.localeCompare(a.date);

export async function getNews(category?: NewsCategory): Promise<NewsItem[]> {
  const list = category ? news.filter((n) => n.category === category) : news;
  return [...list].sort(byDateDesc);
}

export async function getLatestNews(limit: number): Promise<NewsItem[]> {
  return (await getNews()).slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  return news.find((n) => n.slug === slug) ?? null;
}

export async function getNewsSlugs(): Promise<string[]> {
  return news.map((n) => n.slug);
}

/** Соседние материалы той же рубрики, а если их мало — просто свежие. */
export async function getRelatedNews(
  item: NewsItem,
  limit = 3,
): Promise<NewsItem[]> {
  const all = (await getNews()).filter((n) => n.slug !== item.slug);
  const same = all.filter((n) => n.category === item.category);
  const rest = all.filter((n) => n.category !== item.category);
  return [...same, ...rest].slice(0, limit);
}
