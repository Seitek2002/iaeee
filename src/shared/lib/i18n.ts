import type { LText, Lang } from "@/shared/api";

/** Текст на нужном языке; если перевода нет — русский. */
export function pick(text: LText, lang: Lang) {
  return text[lang] || text.ru;
}

/** Статус события относительно текущей даты (на момент сборки страницы). */
export function eventStatus(start: string, end: string, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  if (today < start) return "upcoming" as const;
  if (today > end) return "finished" as const;
  return "ongoing" as const;
}

export function formatMoney(value: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "ru-RU").format(value);
}
