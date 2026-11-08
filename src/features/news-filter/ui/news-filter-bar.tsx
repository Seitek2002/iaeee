"use client";

import { NEWS_CATEGORY_LABEL, NEWS_CATEGORY_ORDER } from "@/entities/news-item";

import type { NewsCategory } from "@/shared/api";
import { Chip, CloseIcon, SearchIcon } from "@/shared/ui";

import { useNewsFilterStore } from "../model/store";

interface NewsFilterBarProps {
  counts: Partial<Record<NewsCategory, number>>;
  total: number;
}

export function NewsFilterBar({ counts, total }: NewsFilterBarProps) {
  const category = useNewsFilterStore((s) => s.category);
  const query = useNewsFilterStore((s) => s.query);
  const setCategory = useNewsFilterStore((s) => s.setCategory);
  const setQuery = useNewsFilterStore((s) => s.setQuery);

  const categories = NEWS_CATEGORY_ORDER.filter((c) => counts[c]);

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div
        role="group"
        aria-label="Рубрики"
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <Chip
          active={category === "all"}
          count={total}
          onClick={() => setCategory("all")}
        >
          Все
        </Chip>
        {categories.map((c) => (
          <Chip
            key={c}
            active={category === c}
            count={counts[c]}
            onClick={() => setCategory(c)}
          >
            {NEWS_CATEGORY_LABEL[c]}
          </Chip>
        ))}
      </div>

      <div className="relative w-full lg:max-w-xs">
        <SearchIcon
          size={18}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-steel"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Искать в новостях"
          aria-label="Искать в новостях"
          className="h-10 w-full rounded-[2px] border border-rule-strong bg-paper pr-10 pl-10 text-small placeholder:text-steel/70 hover:border-petrol/60 focus:border-petrol focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 text-steel hover:text-petrol"
            aria-label="Очистить поиск"
          >
            <CloseIcon size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
