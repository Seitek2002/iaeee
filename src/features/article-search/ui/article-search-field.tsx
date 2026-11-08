"use client";

import { CloseIcon, SearchIcon } from "@/shared/ui";

import { useArticleSearchStore } from "../model/store";

export function ArticleSearchField() {
  const query = useArticleSearchStore((s) => s.query);
  const setQuery = useArticleSearchStore((s) => s.setQuery);

  return (
    <div className="relative">
      <SearchIcon
        size={19}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-steel"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Название статьи или фамилия автора"
        aria-label="Поиск по статьям «Вестника»"
        className="h-12 w-full rounded-[2px] border border-rule-strong bg-paper pr-11 pl-12 placeholder:text-steel/70 hover:border-petrol/60 focus:border-petrol focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-steel hover:text-petrol"
          aria-label="Очистить поиск"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
}
