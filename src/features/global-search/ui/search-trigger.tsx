"use client";

import { cn } from "@/shared/lib";
import { SearchIcon } from "@/shared/ui";

import { useSearchStore } from "../model/store";

export function SearchTrigger({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "wide";
}) {
  const openSearch = useSearchStore((s) => s.openSearch);

  if (variant === "wide") {
    return (
      <button
        type="button"
        onClick={openSearch}
        className={cn(
          "flex h-12 w-full items-center gap-3 rounded-[2px] border border-rule-strong bg-paper px-4 text-left text-steel transition-colors hover:border-petrol",
          className,
        )}
      >
        <SearchIcon size={18} />
        <span className="flex-1">Поиск по сайту</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-[2px] px-2.5 text-small text-steel transition-colors hover:bg-mist hover:text-petrol",
        className,
      )}
      aria-label="Поиск по сайту (Ctrl+K)"
    >
      <SearchIcon size={19} />
      <kbd className="hidden rounded-[2px] border border-rule-strong px-1.5 py-0.5 font-sans text-[0.6875rem] leading-none xl:inline">
        Ctrl K
      </kbd>
    </button>
  );
}
