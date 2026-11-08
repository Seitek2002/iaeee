"use client";

import type { CountryIso, Lang, ProgramDay } from "@/shared/api";
import { COUNTRY_NAME } from "@/shared/config";
import { cn } from "@/shared/lib";
import { CloseIcon, SearchIcon } from "@/shared/ui";

import { useProgramFilterStore } from "../model/store";

const T = {
  ru: {
    days: "Дни конференции",
    search: "Доклад, докладчик или организация",
    all: "Все страны",
    clear: "Очистить поиск",
    country: "Страна докладчика",
  },
  en: {
    days: "Conference days",
    search: "Paper, speaker or organisation",
    all: "All countries",
    clear: "Clear search",
    country: "Speaker’s country",
  },
};

function dayLabel(date: string, lang: Lang) {
  const d = new Date(`${date}T12:00:00Z`);
  const fmt = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "ru-RU", {
    weekday: "short",
    timeZone: "UTC",
  });
  return { weekday: fmt.format(d), day: d.getUTCDate() };
}

export function ProgramControls({
  days,
  countries,
  lang,
}: {
  countries: [CountryIso, number][];
  days: ProgramDay[];
  lang: Lang;
}) {
  const t = T[lang];
  const day = useProgramFilterStore((s) => s.day) ?? days[0].date;
  const query = useProgramFilterStore((s) => s.query);
  const country = useProgramFilterStore((s) => s.country);
  const setDay = useProgramFilterStore((s) => s.setDay);
  const setQuery = useProgramFilterStore((s) => s.setQuery);
  const setCountry = useProgramFilterStore((s) => s.setCountry);
  const searching = query.trim() !== "" || country !== "all";

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label={t.days}
        className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      >
        {days.map((d) => {
          const { weekday, day: num } = dayLabel(d.date, lang);
          const active = !searching && d.date === day;
          return (
            <button
              key={d.date}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setDay(d.date);
                setQuery("");
                setCountry("all");
              }}
              className={cn(
                "flex min-w-[7.5rem] shrink-0 flex-col rounded-2xl border px-4 py-3 text-left transition-colors",
                active
                  ? "border-lake bg-lake text-snow"
                  : "border-haze bg-white text-ink hover:border-lake/40",
              )}
            >
              <span
                className={cn(
                  "text-[0.75rem] capitalize",
                  active ? "text-glacier" : "text-ink-muted",
                )}
              >
                {weekday}
              </span>
              <span className="font-conf-display text-[1.25rem] font-semibold tabular">
                {num} {lang === "en" ? "June" : "июня"}
              </span>
              <span
                className={cn(
                  "mt-0.5 truncate text-[0.75rem]",
                  active ? "text-apricot" : "text-ink-muted",
                )}
              >
                {d.place[lang].split(",")[0]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <SearchIcon
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            aria-label={t.search}
            className="h-12 w-full rounded-full border border-haze bg-white pr-11 pl-11 placeholder:text-ink-muted/70 focus:border-lake focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t.clear}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1.5 text-ink-muted hover:text-ink"
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>
        <label className="relative">
          <span className="sr-only">{t.country}</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryIso | "all")}
            className="h-12 w-full appearance-none rounded-full border border-haze bg-white pr-10 pl-5 focus:border-lake focus:outline-none md:w-64"
          >
            <option value="all">{t.all}</option>
            {countries.map(([c, n]) => (
              <option key={c} value={c}>
                {COUNTRY_NAME[c][lang]} ({n})
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </label>
      </div>
    </div>
  );
}
