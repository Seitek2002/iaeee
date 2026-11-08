import type { NewsCategory, NewsItem } from "@/shared/api";

import type { CategoryFilter } from "../model/store";

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export function filterNews(
  items: NewsItem[],
  category: CategoryFilter,
  query: string,
): NewsItem[] {
  const words = norm(query).split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (!words.length) return true;
    const hay = norm(`${item.title} ${item.excerpt}`);
    return words.every((w) => hay.includes(w));
  });
}

export function countByCategory(items: NewsItem[]) {
  const counts: Partial<Record<NewsCategory, number>> = {};
  for (const item of items)
    counts[item.category] = (counts[item.category] ?? 0) + 1;
  return counts;
}
