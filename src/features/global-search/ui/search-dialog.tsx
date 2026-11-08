"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import type { SearchEntry } from "@/shared/api";
import { cn } from "@/shared/lib";
import { CloseIcon, Dialog, SearchIcon } from "@/shared/ui";

import { KIND_LABEL, searchEntries } from "../lib/match";
import { useSearchStore } from "../model/store";

/**
 * Поиск по сайту. Индекс приходит пропом из корневого layout (сервер),
 * открытие — через стор: кнопка в шапке, Ctrl/⌘+K или «/».
 */
export function SearchDialog({ index }: { index: SearchEntry[] }) {
  const router = useRouter();
  const open = useSearchStore((s) => s.open);
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const close = useSearchStore((s) => s.close);
  const toggle = useSearchStore((s) => s.toggle);
  const openSearch = useSearchStore((s) => s.openSearch);
  const [active, setActive] = useState(0);

  const groups = useMemo(() => searchEntries(index, query), [index, query]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // Новый запрос — подсветка снова на первом результате.
  const [lastQuery, setLastQuery] = useState(query);
  if (lastQuery !== query) {
    setLastQuery(query);
    setActive(0);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
        return;
      }
      const target = e.target as HTMLElement;
      const typing =
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle, openSearch]);

  const go = (entry: SearchEntry) => {
    close();
    router.push(entry.href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  };

  let cursor = -1;

  return (
    <Dialog
      open={open}
      onClose={close}
      label="Поиск по сайту"
      className="w-full max-w-2xl bg-film shadow-[0_30px_80px_-30px_rgba(16,38,47,0.55)]"
    >
      <div className="flex items-center gap-3 border-b border-rule px-5">
        <SearchIcon size={20} className="shrink-0 text-steel" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onInputKey}
          placeholder="Новости, статьи, документы, организации"
          aria-label="Что найти"
          aria-controls="search-results"
          aria-activedescendant={
            flat[active] ? `sr-${flat[active].id}` : undefined
          }
          className="h-16 min-w-0 flex-1 bg-transparent text-lead placeholder:text-steel/70 focus:outline-none"
        />
        <button
          type="button"
          onClick={close}
          className="-mr-2 p-2 text-steel transition-colors hover:text-petrol"
          aria-label="Закрыть поиск"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      <div
        id="search-results"
        role="listbox"
        className="max-h-[60vh] overflow-y-auto px-2 py-3"
      >
        {groups.length === 0 ? (
          <div className="px-3 py-10 text-center">
            <p className="font-medium">
              По запросу «{query}» ничего не нашлось
            </p>
            <p className="mt-2 text-small text-steel">
              Попробуйте фамилию автора, номер норматива или тему — например,
              «сейсмоизоляция» или «СН КР 20-02».
            </p>
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.kind} className="mb-2">
              <p className="px-3 pt-2 pb-1.5 text-caption text-steel">
                {query ? KIND_LABEL[group.kind] : "Разделы сайта"}
              </p>
              <ul>
                {group.items.map((entry) => {
                  cursor += 1;
                  const index = cursor;
                  const isActive = index === active;
                  return (
                    <li
                      key={entry.id}
                      id={`sr-${entry.id}`}
                      role="option"
                      aria-selected={isActive}
                    >
                      <button
                        type="button"
                        tabIndex={-1}
                        onMouseMove={() => setActive(index)}
                        onClick={() => go(entry)}
                        className={cn(
                          "block w-full rounded-[2px] px-3 py-2.5 text-left transition-colors",
                          isActive ? "bg-petrol text-film" : "hover:bg-mist",
                        )}
                      >
                        <span className="line-clamp-1 font-medium">
                          {entry.title}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 line-clamp-1 text-small",
                            isActive ? "text-film/65" : "text-steel",
                          )}
                        >
                          {entry.hint}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="hidden items-center gap-5 border-t border-rule px-5 py-3 text-caption text-steel sm:flex">
        {[
          ["↑↓", "выбрать"],
          ["Enter", "открыть"],
          ["Esc", "закрыть"],
        ].map(([key, action]) => (
          <span key={key} className="inline-flex items-center gap-1.5">
            <kbd className="rounded-[2px] border border-rule-strong px-1.5 py-0.5 font-sans text-[0.6875rem] leading-none text-petrol">
              {key}
            </kbd>
            {action}
          </span>
        ))}
      </div>
    </Dialog>
  );
}
