import type { SearchEntry, SearchKind } from "@/shared/api";

export const KIND_LABEL: Record<SearchKind, string> = {
  page: "Разделы сайта",
  news: "Новости",
  article: "Статьи «Вестника»",
  member: "Члены ассоциации",
  document: "Документы",
};

const KIND_ORDER: SearchKind[] = [
  "page",
  "news",
  "article",
  "member",
  "document",
];
const PER_GROUP = 5;

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[«»"“”„]/g, "");

export interface SearchGroup {
  items: SearchEntry[];
  kind: SearchKind;
}

/**
 * Все слова запроса должны встретиться в заголовке или подсказке.
 * Совпадения в заголовке поднимаются выше.
 */
export function searchEntries(
  index: SearchEntry[],
  query: string,
): SearchGroup[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);

  const scored = words.length
    ? index
        .map((entry) => {
          const title = normalize(entry.title);
          const hay = `${title} ${normalize(entry.hint)}`;
          if (!words.every((w) => hay.includes(w))) return null;
          const score = words.filter((w) => title.includes(w)).length;
          return { entry, score };
        })
        .filter((x): x is { entry: SearchEntry; score: number } => x !== null)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.entry)
    : index.filter((e) => e.kind === "page");

  return KIND_ORDER.map((kind) => ({
    kind,
    items: scored.filter((e) => e.kind === kind).slice(0, PER_GROUP),
  })).filter((g) => g.items.length > 0);
}
