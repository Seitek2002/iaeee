"use client";

import { useMemo } from "react";

import {
  NewsFilterBar,
  countByCategory,
  filterNews,
  useNewsFilterStore,
} from "@/features/news-filter";

import { NewsCard } from "@/entities/news-item";

import type { NewsItem } from "@/shared/api";
import { plural } from "@/shared/lib";
import { Button } from "@/shared/ui";

export function NewsList({ items }: { items: NewsItem[] }) {
  const category = useNewsFilterStore((s) => s.category);
  const query = useNewsFilterStore((s) => s.query);
  const reset = useNewsFilterStore((s) => s.reset);

  const counts = useMemo(() => countByCategory(items), [items]);
  const visible = useMemo(
    () => filterNews(items, category, query),
    [items, category, query],
  );
  const filtered = category !== "all" || query.trim() !== "";

  return (
    <div>
      <NewsFilterBar counts={counts} total={items.length} />

      <p aria-live="polite" className="mt-8 text-small text-steel">
        {filtered
          ? `Найдено ${visible.length} ${plural(visible.length, ["материал", "материала", "материалов"])}`
          : `${items.length} ${plural(items.length, ["материал", "материала", "материалов"])} с 2019 года`}
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 border-t border-petrol py-16">
          <p className="text-h3">По этому запросу материалов нет</p>
          <p className="mt-3 max-w-lg text-steel">
            Уберите часть слов или выберите другую рубрику. Статьи «Вестника»
            ищутся отдельно — на странице журнала.
          </p>
          <Button variant="outline" size="sm" className="mt-6" onClick={reset}>
            Показать все новости
          </Button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-x-8 gap-y-14 border-t border-petrol pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <li key={item.slug}>
              <NewsCard item={item} priority={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
