import type { NewsCategory } from "@/shared/api";

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  conferences: "Конференции",
  seminars: "Семинары и лекции",
  publications: "Публикации",
  research: "Исследования",
  contests: "Конкурсы",
  congratulations: "Поздравления и награды",
  memory: "Память",
};

/** Порядок рубрик в фильтре — по важности для читателя, а не по алфавиту. */
export const NEWS_CATEGORY_ORDER: NewsCategory[] = [
  "seminars",
  "conferences",
  "publications",
  "research",
  "contests",
  "congratulations",
  "memory",
];
